import { getToken } from 'next-auth/jwt';
import { ShowType } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getKeys,
  groupByFunc,
  horseExists,
  memberExists,
} from '@/backend/router/utils';
import { Entry, EntryModel } from '@/utils/zodschemas';
import {
  GroupedByDivision,
  GroupedEntries,
  HEADER_NAMES,
  isEntry,
  isHeadingNames,
  isShowUniqueArgs,
  isZodFieldError,
  ParseError,
} from '@/types/common';
import { prisma } from '@/server/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed.' });
  }

  // const token = await getToken({ req });
  // if (!token) {
  //   console.warn('Attempted to access api protected by auth.');
  //   return res.status(401).json({ message: 'Access Not Allowed.' });
  // }

  try {
    const entries = parseCSV(req.body);

    // No Errors found when parsing, we can start inserting into db
    if (!entries.every(entry => entry.success)) {
      const parseErrors = entries
        .map(entry => {
          if (!entry.success) {
            return entry.error.flatten().fieldErrors;
          }
        })
        .filter(isZodFieldError<Entry>);

      return res.status(500).json({ message: parseErrors });
    }

    const parsedEntries = entries
      .map(entry => {
        if (entry.success) return entry.data;
      })
      .filter(isEntry);

    const grouped = groupEntries(parsedEntries);

    const params = req.query;
    if (!isShowUniqueArgs(params)) {
      return res.status(500).json({ message: 'Invalid query param passed.' });
    }

    await uploadPoints(grouped, params.showUID);

    return res.status(200).json({ success: true });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
}

function groupEntries(entries: Entry[]) {
  const divisionGroup: GroupedByDivision = groupByFunc(
    entries,
    e => e.division
  );

  let finalGrouping: GroupedEntries = {};
  for (const key of getKeys(divisionGroup)) {
    finalGrouping[key] = groupByFunc(divisionGroup[key], e => e.group);
  }

  return finalGrouping;
}

type PointsMap = {
  [p_key in ShowType]: { [c_key in Entry['placing']]: number };
};
const POINTS: PointsMap = {
  CT: {
    '1': 3,
    '2': 2.5,
    '3': 2,
    '4': 1.5,
    '5': 1,
    '6': 0.5,
    C: 0,
    HC: 0,
    R: 0,
    E: 0,
    W: 0,
    RF: 0,
  },
  Derby: {
    '1': 4.5,
    '2': 3.75,
    '3': 3,
    '4': 2.75,
    '5': 1.5,
    '6': 0.75,
    C: 0,
    HC: 0,
    R: 0,
    E: 0,
    W: 0,
    RF: 0,
  },
  HT: {
    '1': 6,
    '2': 5,
    '3': 4,
    '4': 3,
    '5': 2,
    '6': 1,
    C: 0,
    HC: 0,
    R: 0,
    E: 0,
    W: 0,
    RF: 0,
  },
};

function calculatePoints(
  placing: Entry['placing'],
  showType: ShowType,
  countInDivison: number
): number {
  if (countInDivison >= 5) {
    return POINTS[showType][placing] * 2;
  } else {
    return POINTS[showType][placing];
  }
}

async function uploadPoints(entries: GroupedEntries, showUID: string) {
  const showExists = await prisma.show.findUnique({
    where: {
      uid: showUID,
    },
  });

  if (!showExists) {
    throw new ParseError('Failed to find matching show.');
  }

  // Loop Through Divisions
  // Loop Through Groups
  let promises = new Array();
  for (const [_, subGroup] of Object.entries(entries)) {
    for (const [_, entryList] of Object.entries(subGroup)) {
      for (const entry of entryList) {
        const entryName = `${entry.firstName} ${entry.lastName}`;

        if (!(await horseExists(entry.horseName))) {
          continue;
        }

        if (!(await memberExists(entryName))) {
          continue;
        }

        const riderFinalPoints = calculatePoints(
          entry.placing,
          showExists.showType,
          entryList.length
        );

        const riderCombo = {
          division: entry.division,
          member: {
            connect: {
              fullName: entryName,
            },
          },
          horse: {
            connect: {
              horseRN: entry.horseName,
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

        promises.push(
          prisma.riderCombo.upsert({
            where: {
              memberName_horseName_division: {
                memberName: entryName,
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
              totalPoints: riderFinalPoints,
              totalShows: 1,
              ...points,
            },
          })
        );
      }
    }
  }

  await Promise.all(promises);
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
