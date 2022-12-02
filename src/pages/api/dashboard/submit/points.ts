import { getToken } from 'next-auth/jwt';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Entry, EntryModel } from '@/utils/zodschemas';
import { HEADER_NAMES, isEntry, isHeadingNames, isZodFielError } from '@/types/common';
import { prisma } from '@/backend/prisma';
import { NotFoundError, PrismaClientKnownRequestError } from '@prisma/client/runtime';

class ParseError extends Error { }

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

      await uploadPoints(parsedEntries);
      return res.status(200).json({ success: true });
    }

    // NOTE: Crappy type here...
    const parseErrors = entries
      .map(entry => {
        if (!entry.success) {
          return entry.error.flatten().fieldErrors;
        }
      }).filter(isZodFielError<Entry>);

    return res.status(500).json({ message: parseErrors });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
}

async function uploadPoints(entries: Entry[]) {
  for (const entry of entries) {
    const show = await prisma.show.findUniqueOrThrow({
      where: {
        showName_showDate: {
          showName: 'Pine Hill',
          showDate: '2022-12-04T06:00:00.000Z',
        },
      },
    });

    const riderName = `${entry.firstName} ${entry.lastName}`;
    const horseExists = await prisma.horse.findUnique({
      where: { horseRN: entry.horseName },
    });

    const memberExists = await prisma.member.findUnique({
      where: { fullName: 'Taco' },
    });

    const riderCombo = {
      division: entry.division,
      member: {
        connect: {
          fullName: riderName,
        },
      },
      horse: {
        connect: {
          horseRN: entry.horseName,
        },
      },
      shows: {
        connect: {
          uid: show.uid,
        },
      },
      totalPoints: { increment: entry.finalScore },
      totalShows: { increment: 1 },
      completedHT: show.showType === 'HT',
    };

    const points = {
      points: {
        create: {
          points: entry.finalScore,
          place: parseInt(entry.placing),
          show: {
            connect: {
              uid: show.uid,
            },
          },
        },
      },
    };

    await prisma.riderCombo.upsert({
      where: {
        memberName_horseName_division: {
          memberName: riderName,
          horseName: entry.horseName,
          division: riderCombo.division,
        },
      },
      update: {
        ...riderCombo,
        ...points,
      },
      create: {
        ...riderCombo,
        totalPoints: entry.finalScore,
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
