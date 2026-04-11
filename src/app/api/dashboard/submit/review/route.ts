import { checkAuth } from '@/auth';
import { findFirst } from '@/server/prisma/queries/shared';
import { CSVEntry, CSVEntrySchema, getKeys, groupByFunc } from '@/server/utils';
import {
  EntriesRideType,
  EntriesRideTypeDivision,
  GroupedEntries,
} from '@/types/common';
import { EntryReviewType } from '@/utils/zodschemas';
import { ShowType } from '@prisma/client';
import { parse } from 'csv';
import { NextRequest, NextResponse } from 'next/server';
import { finished } from 'stream/promises';
import { fromZodError, ValidationError } from 'zod-validation-error';

export const POST = checkAuth(async (req: NextRequest) => {
  const res = NextResponse.next();
  res.headers.append('Content-Type', 'application/json; charset=utf-8');

  const file = await req.blob();

  if (file.type !== 'text/csv') {
    return NextResponse.json(
      { success: false, message: 'Only csv files are allowed.' },
      { status: 500 },
    );
  }

  try {
    const entries = await nodeCsvParser(Buffer.from(await file.arrayBuffer()));

    if (entries.failed.length != 0) {
      return NextResponse.json(
        { success: false, data: entries.failed },
        { status: 412 },
      );
    }

    const entriesWithMembership = await checkforMembership(
      groupEntries(entries.successful),
    );

    return NextResponse.json(
      {
        success: true,
        data: entriesWithMembership,
        totalEntryCount: entries.successful.length,
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return NextResponse.json({ message: err.message }, { status: 500 });
    }
  }
});

interface EntryParseResults {
  successful: Array<CSVEntry>;
  failed: Array<ValidationError>;
}

async function nodeCsvParser(csv: Buffer<ArrayBufferLike>) {
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
    trim: true,
    relax_column_count: true,
    on_record: record => CSVEntrySchema.safeParse(record),
  });

  parser.on('readable', () => {
    let record;
    while ((record = parser.read()) !== null) {
      if (record.success) {
        entries.successful.push(record.data);
      } else {
        const prettyZodError = fromZodError(record.error);
        entries.failed.push(prettyZodError);
      }
    }
  });

  await finished(parser);
  return entries;
}

function groupEntries(entries: Array<CSVEntry>) {
  // Group each entry by the type of ride they did (CT/HT/Derby)
  const rideTypes: EntriesRideType = groupByFunc(entries, e => e.rideType);

  // Group each of the above further into divisions
  const divisionGrouping: EntriesRideTypeDivision = {
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

type PointsMap = {
  [k in ShowType]: {
    [count: string]: {
      [k in CSVEntry['placing']]?: number;
    };
  };
};
// prettier-ignore
const POINTS: PointsMap = {
  CT: {
   '2': { '1': 2, '2': 1},
   '3': { '1': 4, '2': 3, '3': 2, '4': 1},
   '4': { '1': 4, '2': 3, '3': 2, '4': 1},
   '5': { '1': 6, '2': 5, '3': 4, '4': 3, '5': 2, '6': 1},
  },
  Derby: {
   '2': { '1': 3, '2': 2},
   '3': { '1': 5, '2': 4, '3': 3, '4': 2},
   '4': { '1': 5, '2': 4, '3': 3, '4': 2},
   '5': { '1': 8, '2': 7, '3': 6, '4': 5, '5': 4, '6': 2},
  },
  HT: {
   '2': { '1': 5, '2': 3},
   '3': { '1': 7, '2': 6, '3': 5, '4': 4},
   '4': { '1': 7, '2': 6, '3': 5, '4': 4},
   '5': { '1': 10, '2': 9, '3': 8, '4': 7, '5': 6, '6': 4},
  },
};

function calculatePoints(
  placing: CSVEntry['placing'],
  showType: ShowType,
  countInDivision: number,
): number {
  if (countInDivision > 5) {
    countInDivision = 5;
  }

  const bracket = POINTS[showType][countInDivision.toString()];
  if (bracket == undefined) {
    return 0;
  }

  const points = bracket[placing];
  if (points == undefined) {
    return 0;
  }

  return points;
}

async function riderExists(fullName: string, horseRN: string, endDate: Date) {
  const member = await findFirst('Member', {
    where: {
      fullName: {
        equals: fullName,
        mode: 'insensitive',
      },
      OR: [{ membershipEnd: endDate }, { memberStatus: 'Life' }],
    },
  });

  if (member === null) {
    throw Error(`Member ${fullName} not found.`);
  }

  const horse = await findFirst('Horse', {
    where: {
      horseRN: {
        equals: horseRN,
        mode: 'insensitive',
      },
      OR: [{ registrationEnd: endDate }, { regType: 'Life' }],
    },
  });
  if (horse === null) {
    throw Error(`Horse ${horseRN} not found.`);
  }

  return { member, horse };
}

async function checkforMembership(entries: GroupedEntries) {
  const updatedMemberPoints = new Array<EntryReviewType>();
  const promises = [];
  const currDate = new Date();
  const membershipEnd = new Date(currDate.getFullYear(), 10, 30);

  // If the current month is decemeber
  if (currDate.getMonth() == 11) {
    membershipEnd.setFullYear(membershipEnd.getFullYear() + 1);
  }

  for (const [, divisions] of Object.entries(entries)) {
    for (const [, groups] of Object.entries(divisions)) {
      for (const [, entryList] of Object.entries(groups)) {
        for (const entry of entryList) {
          const entryName = `${entry.firstName} ${entry.lastName}`;
          promises.push(
            riderExists(entryName, entry.horseName, membershipEnd)
              .then(({ member, horse }) =>
                updatedMemberPoints.push({
                  fullName: member.fullName,
                  horseRN: horse.horseRN,
                  division: entry.division,
                  countInDivision: entryList.length,
                  rideType: entry.rideType,
                  placing: entry.placing,
                  points: calculatePoints(
                    entry.placing,
                    entry.rideType,
                    entryList.length,
                  ),
                }),
              )
              .catch(e => console.log(e.message)),
          );
        }
      }
    }
  }

  await Promise.allSettled(promises);
  return updatedMemberPoints;
}
