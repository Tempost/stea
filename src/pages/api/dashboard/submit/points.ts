import { getToken } from 'next-auth/jwt';
import { ShowType } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getKeys,
  groupByFunc,
  horseExists,
  memberExists,
} from '@/server/router/utils';
import { Entry, EntrySchema } from '@/server/utils';
import {
  EntriesRideTypeDivison,
  EntriesRideType,
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
    console.warn('Attempted to access via unsupported method');
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
    if (!entries.every(entry => entry.success)) {
      console.log(JSON.stringify(entries, null, 2));
      const parseErrors = entries
        .map(entry => {
          if (!entry.success) {
            return entry.error.flatten().fieldErrors;
          }
        })
        .filter(isZodFieldError<Entry>);

      console.log('Error parsing csv', JSON.stringify(parseErrors, null, 2));
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
      console.log(JSON.stringify(params, null, 2));
      return res.status(500).json({ message: 'Invalid query param passed.' });
    }

    await uploadPoints(grouped, params.showUID);

    return res.status(200).json({ success: true });
  } catch (err) {
    // TODO: Maybe add check for prisma error here first, then the generic erorr
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
}

function groupEntries(entries: Entry[]) {
  // Group each entry by the type of ride they did (CT/HT/Derby)
  const rideTypes: EntriesRideType = groupByFunc(entries, e => e.rideType);

  // Group each of the above further into divisions
  let divisionGrouping: EntriesRideTypeDivison = { CT: {}, HT: {}, Derby: {} };
  for (const key of getKeys(rideTypes)) {
    divisionGrouping[key] = groupByFunc(rideTypes[key], e => e.division);
  }

  // Finally group into final A,B,C,D groupings
  let finalGrouping: GroupedEntries = { CT: {}, HT: {}, Derby: {} };
  for (const key of getKeys(divisionGrouping)) {
    for (const subKey of getKeys(divisionGrouping[key])) {
      const inner_entries = divisionGrouping[key][subKey];
      if (typeof inner_entries === 'undefined') {
        continue;
      }

      finalGrouping[key][subKey] = groupByFunc(inner_entries, e => e.group);
    }
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

  let promises = new Array();
  for (const [_, divisions] of Object.entries(entries)) {
    for (const [_, groups] of Object.entries(divisions)) {
      for (const [_, entryList] of Object.entries(groups)) {
        for (const entry of entryList) {
          const entryName = `${entry.firstName} ${entry.lastName}`;

          if (!(await horseExists(entry.horseName))) {
            console.log(`${entry.horseName} does not exist, skipping`);
            continue;
          }

          if (!(await memberExists(entryName))) {
            console.log(`${entryName} does not exist, skipping`);
            continue;
          }

          const riderFinalPoints = calculatePoints(
            entry.placing,
            entry.rideType,
            entryList.length
          );

          const relations = {
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
                  division: entry.division,
                },
              },
              update: {
                division: entry.division,
                totalPoints: { increment: riderFinalPoints },
                totalShows: { increment: 1 },
                completedHT: entry.rideType === 'HT',
                ...relations,
              },
              create: {
                division: entry.division,
                totalPoints: riderFinalPoints,
                totalShows: 1,
                ...relations,
              },
            })
          );
        }
      }
    }
  }

  await Promise.all(promises).then(() =>
    prisma.show.update({ where: { uid: showUID }, data: { reviewed: true } })
  );
}

function parseCSV(csv: string) {
  const lines = csv
    .trim()
    .split('\n')
    .map(line => line.trim());
  const heading = lines.shift();

  if (!heading) {
    throw new ParseError('Failed to find column headings.');
  }

  const headingNames = heading.split(',').filter(colName => !!colName);
  if (!isHeadingNames(headingNames)) {
    throw new ParseError('Invalid column headings.');
  }

  const mappedNames = headingNames.map(head => HEADER_NAMES[head]);

  const entries = lines
    .map(line => {
      return line
        .split(',')
        .map((value, column) => {
          if (mappedNames[column].includes('finalScore')) {
            const finalScore = parseFloat(value);
            return { [mappedNames[column]]: finalScore };
          }

          return { [mappedNames[column]]: value.trim() };
        })
        .reduce<{ [x: string]: string | number } | {}[]>((prev, curr) => {
          return { ...prev, ...curr };
        }, {}) as Entry;
    })
    .map(entry => EntrySchema.safeParse(entry));

  return entries;
}
