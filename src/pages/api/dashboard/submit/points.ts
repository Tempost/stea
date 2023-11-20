import { getToken } from 'next-auth/jwt';
import { Prisma, ShowType } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getKeys, groupByFunc } from '@/server/router/utils';
import { CSVEntry, CSVEntrySchema, Entry } from '@/server/utils';
import {
  EntriesRideTypeDivison,
  EntriesRideType,
  GroupedEntries,
  PointsMap,
} from '@/types/common';
import { EntryReviewType } from '@/utils/zodschemas';
import { parse } from 'csv';
import { fromZodError, ValidationError } from 'zod-validation-error';
import { prisma } from '@/server/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    console.warn('Attempted to access via unsupported method');
    return res.status(405).end();
  }

  const token = await getToken({ req });
  if (!token) {
    console.error('Attempted to access api protected by auth.');
    return res.status(401).end();
  }

  try {
    const entries = await nodeCsvParser(req.body);

    if (entries.failed.length != 0) {
      return res.status(412).json({ success: false, data: entries.failed });
    }

    const entriesWithMembership = await checkforMembership(
      groupEntries(entries.successful)
    );

    console.log(entriesWithMembership);
    return res.status(200).json({
      success: true,
      data: entriesWithMembership,
      totalEntryCount: entries.successful.length,
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  }
}

interface EntryParseResults {
  successful: CSVEntry[];
  failed: ValidationError[];
}

async function nodeCsvParser(csv: string) {
  const entries: EntryParseResults = {
    successful: [],
    failed: [],
  };

  const parser = parse(csv, {
    columns: [
      'firstName',
      'lastName',
      'horseName',
      'rideType',
      'division',
      'group',
      'finalScore',
      'placing',
    ],
    from_line: 2,
    skip_empty_lines: true,
    skip_records_with_empty_values: true,
    ignore_last_delimiters: true,
    trim: true,
    on_record: record => CSVEntrySchema.safeParse(record),
  });

  for await (const record of parser) {
    if (record.success) {
      entries.successful.push(record.data);
    } else {
      const prettyZodError = fromZodError(record.error);
      entries.failed.push(prettyZodError);
    }
  }
  return entries;
}

function groupEntries(entries: Entry[]) {
  // Group each entry by the type of ride they did (CT/HT/Derby)
  const rideTypes: EntriesRideType = groupByFunc(entries, e => e.rideType);

  // Group each of the above further into divisions
  const divisionGrouping: EntriesRideTypeDivison = {
    CT: {},
    HT: {},
    Derby: {},
  };
  for (const key of getKeys(rideTypes)) {
    divisionGrouping[key] = groupByFunc(rideTypes[key], e => e.division);
  }

  // Finally group into final A,B,C,D groupings
  const finalGrouping: GroupedEntries = { CT: {}, HT: {}, Derby: {} };
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

async function riderExists(fullName: string, horseRN: string) {
  const memberExists = prisma.member.findUniqueOrThrow({
    where: { fullName },
  });

  const horseExists = prisma.horse.findUniqueOrThrow({
    where: { horseRN },
  });

  return !(await memberExists) && !(await horseExists);
}

async function checkforMembership(entries: GroupedEntries) {
  const updatedMemberPoints = new Array<EntryReviewType>();
  const promises = [];
  for (const [, divisions] of Object.entries(entries)) {
    for (const [, groups] of Object.entries(divisions)) {
      for (const [, entryList] of Object.entries(groups)) {
        for (const entry of entryList) {
          const entryName = `${entry.firstName} ${entry.lastName}`;
          promises.push(
            riderExists(entryName, entry.horseName)
              .then(() =>
                updatedMemberPoints.push({
                  fullName: entryName,
                  horseRN: entry.horseName,
                  division: entry.division,
                  countInDivision: entryList.length,
                  rideType: entry.rideType,
                  placing: entry.placing,
                  points: calculatePoints(
                    entry.placing,
                    entry.rideType,
                    entryList.length
                  ),
                })
              )
              .catch(error => {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                  console.log(error.message);
                } else {
                  console.log('Unexpected erorr', error);
                }
              })
          );
        }
      }
    }
  }

  await Promise.allSettled(promises);
  return updatedMemberPoints;
}
