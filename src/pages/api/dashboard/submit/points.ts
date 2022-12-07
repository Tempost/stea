import { getToken } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Entry, EntryModel } from '@/utils/zodschemas';
import {
  HEADER_NAMES,
  isEntry,
  isHeadingNames,
  isShowUniqueArgs,
  isZodFieldError,
} from '@/types/common';
import { prisma } from '@/backend/prisma';

class ParseError extends Error {}

// Upload .csv file to this API
// Convert .csv file into zod objects?
// Which ever method will get me a ridercombo w/ points
//
// After processing is finished, respond to client saying job complete
// respond with any errors if found

// TODO: Figure out why out of no where it started to throw validation errors?
// Started reading the final new line of the file, probably since i saved it in unix....
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed.' });
  }

  const token = await getToken({ req });
  if (!token) {
    console.warn('Attempted to access api protected by auth.');
    return res.status(401).json({ message: 'Access Not Allowed.' });
  }

  try {
    const entries = parseCSV(req.body);

    // No Errors found when parsing, we can start inserting into db
    if (entries.every(entry => entry.success)) {
      const parsedEntries = entries
        .map(entry => {
          if (entry.success) return entry.data;
        })
        .filter(isEntry);

      const params = req.query;
      if (isShowUniqueArgs(params)) {
        await uploadPoints(parsedEntries, params.showUID);
      }

      return res.status(200).json({ success: true });
    }

    // NOTE: Crappy type here...
    const parseErrors = entries
      .map(entry => {
        if (!entry.success) {
          return entry.error.flatten().fieldErrors;
        }
      })
      .filter(isZodFieldError<Entry>);

    return res.status(500).json({ message: parseErrors });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
}

// TODO: Create Error array, append member/horses not found and return.
// Need to report these to the frontend
async function uploadPoints(entries: Entry[], showUID: string) {
  const showExists = await prisma.show.findUnique({
    where: {
      uid: showUID,
    },
  });

  if (!showExists) {
    throw new ParseError('Failed to find matching show.');
  }

  for (const entry of entries) {
    const horseExists = await prisma.horse.findUnique({
      where: { horseRN: entry.horseName },
    });

    if (!horseExists) {
      continue;
    }

    const memberExists = await prisma.member.findUnique({
      where: { fullName: `${entry.firstName} ${entry.lastName}` },
    });

    if (!memberExists) {
      continue;
    }

    const riderFinalPoints = ['0', 'W', 'E', 'RF'].includes(entry.placing)
      ? 0
      : entry.finalScore;

    const riderCombo = {
      division: entry.division,
      member: {
        connect: {
          fullName: memberExists.fullName,
        },
      },
      horse: {
        connect: {
          horseRN: horseExists.horseRN,
        },
      },
      shows: {
        connect: {
          uid: showExists.uid,
        },
      },
      totalPoints: { increment: riderFinalPoints },
      totalShows: { increment: 1 },
      completedHT: showExists.showType === 'HT',
    };

    const points = {
      points: {
        create: {
          points: riderFinalPoints,
          place: entry.placing,
          show: {
            connect: {
              uid: showExists.uid,
            },
          },
        },
      },
    };

    await prisma.riderCombo.upsert({
      where: {
        memberName_horseName_division: {
          memberName: memberExists.fullName,
          horseName: horseExists.horseRN,
          division: riderCombo.division,
        },
      },
      update: {
        ...riderCombo,
        ...points,
      },
      create: {
        ...riderCombo,
        totalPoints: riderFinalPoints,
        totalShows: 1,
        ...points,
      },
    });
  }
}

function parseCSV(csv: string) {
  const lines = csv
    .trim()
    .split('\n')
    .map(line => line.trim());
  const heading = lines.shift();

  if (!heading) {
    throw new ParseError('Failed to parse csv file.');
  }

  const headingNames = heading.split(',');
  if (!isHeadingNames(headingNames)) {
    throw new ParseError('Failed to parse csv file.');
  }

  const mappedNames = headingNames.map(head => HEADER_NAMES[head]);

  const entries = lines
    .map(line => {
      return (
        line
          .split(',')
          .map((value, index) => {
            if (mappedNames[index].includes('finalScore')) {
              const finalScore = parseFloat(value);
              return { [mappedNames[index]]: finalScore };
            }

            return { [mappedNames[index]]: value.trim() };
          })
          // NOTE: Better way to type this?
          .reduce<{ [x: string]: string | number } | {}[]>((prev, curr) => {
            return { ...prev, ...curr };
          }, {}) as Entry
      );
    })
    .map(entry => EntryModel.safeParse(entry));

  return entries;
}
