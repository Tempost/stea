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
  HEADER_MAPPING,
  isEntry,
  isHeadingNames,
  isZodFieldError,
  ParseError,
  PointsMap,
} from '@/types/common';
import { EntryReviewType } from '@/utils/zodschemas';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    console.warn('Attempted to access via unsupported method');
    return res.status(405).json({ message: 'Method Not Allowed.' });
  }

  // const token = await getToken({ req });
  // if (!token) {
  //   console.error('Attempted to access api protected by auth.');
  //   return res.status(401).json({ message: 'Access Not Allowed.' });
  // }

  try {
    const entries = parseCSV(req.body);

    // Errors found while parsing the entries, return a report of which entries failed
    // UI will display a table of entries, including the onces that were valid
    // since zod doesn't give us the row or name of the record that failed we use this method
    // to keep context for the person fixing the issue
    if (!entries.every(entry => entry.success)) {
      const parseErrors = entries
        .map(entry => {
          if (!entry.success) {
            return entry.error.flatten().fieldErrors;
          }
        })
        .filter(isZodFieldError<Entry>);

      console.error(
        'Trouble parsing entries',
        JSON.stringify(parseErrors, null, 0)
      );
      return res.status(400).json({ success: false, data: entries });
    }

    const parsedEntries = entries
      .map(entry => {
        if (entry.success) return entry.data;
      })
      .filter(isEntry);

    const entriesWithMembership = await checkforMembership(
      groupEntries(parsedEntries)
    );

    return res
      .status(200)
      .json({
        success: true,
        data: entriesWithMembership,
        totalEntryCount: parsedEntries.length,
      });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
}

function removeEmpty(value: string) {
  return !value.includes(',,,,,,,');
}

function parseCSV(csv: string) {
  const lines = csv.trim().split('\n').filter(removeEmpty);
  const heading = lines.shift();

  if (!heading) {
    throw new ParseError('Failed to find column headings.');
  }

  const headingNames = heading
    .trim()
    .split(',')
    .filter(colName => !!colName);

  if (!isHeadingNames(headingNames)) {
    throw new ParseError('Invalid column headings.');
  }

  const entries = lines.map(line => {
    const row = line.trim().split(',');
    let entry: Record<string, string | number> = {};

    row.forEach((value, column) => {
      const columnName = HEADER_MAPPING[headingNames[column]];
      if (columnName === 'finalScore') {
        const finalScore = parseFloat(value);
        entry[columnName] = finalScore;
        return;
      }

      entry[columnName] = value.trim();
    });

    return EntrySchema.safeParse(entry);
  });

  return entries;
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

async function checkforMembership(entries: GroupedEntries) {
  let updatedMemberPoints = new Array<EntryReviewType>();
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

          updatedMemberPoints.push({
            fullName: entryName,
            horseRN: entry.horseName,
            division: entry.division,
            countInDivision: entryList.length,
            rideType: entry.rideType,
            placing: entry.placing,
            points: riderFinalPoints,
          });
        }
      }
    }
  }

  return updatedMemberPoints;
}
