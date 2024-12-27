import { findUnique, update, upsert } from '@/server/prisma/queries/shared';
import { EntrySubmissionSchema } from '@/utils/zodschemas';
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

const currentDate = new Date();
const capDate = new Date();
capDate.setMonth(10);
capDate.setDate(30);

export async function POST(req: NextRequest) {
  console.log(req.url);
  const showUID = req.nextUrl.searchParams.get('showUID');
  const body = req.json();

  if (!showUID) {
    console.log('Invalid query param', JSON.stringify(showUID, null, 0));
    return NextResponse.json(
      { message: 'showUID must be included in the query params to download.' },
      { status: 500 },
    );
  }

  const existingShow = await findUnique('Show', {
    where: {
      uid: showUID,
    },
    select: {
      uid: true,
      showDate: true,
      showName: true,
    },
  });

  if (!existingShow) {
    console.warn("Attempted to update show that doesn't exist.");
    return NextResponse.json(
      {
        message: 'Selected show not found or points were already submitted.',
      },
      { status: 400 },
    );
  }

  const entries = EntrySubmissionSchema.parse(await body);

  const dbActions = [];
  let year = existingShow.showDate.getFullYear();

  if (year == currentDate.getFullYear() && existingShow.showDate > capDate) {
    year += 1;
  }

  for (const entry of entries) {
    const relations = {
      member: {
        connect: {
          fullName: entry.fullName,
        },
      },
      horse: {
        connect: {
          horseRN: entry.horseRN,
        },
      },
      shows: {
        connect: {
          uid: existingShow.uid,
        },
      },
      points: {
        create: {
          points: entry.points,
          place: entry.placing,
          show: {
            connect: {
              uid: existingShow.uid,
            },
          },
        },
      },
    };

    dbActions.push(
      upsert('RiderCombo', {
        where: {
          memberName_horseName_division_showYear: {
            memberName: entry.fullName,
            horseName: entry.horseRN,
            division: entry.division,
            showYear: existingShow.showDate.getFullYear(),
          },
        },
        update: {
          division: entry.division,
          totalPoints: { increment: entry.points },
          totalShows: { increment: 1 },
          completedHT: entry.rideType === 'HT',
          ...relations,
        },
        create: {
          division: entry.division,
          totalPoints: entry.points,
          totalShows: 1,
          showYear: year,
          ...relations,
        },
      }).catch(e => {
        console.log(e);
        console.log(entry.fullName, entry.horseRN);
      }),
    );
  }

  // TODO(Cody): Needs to be done in a transaction show it can rollback if any errors
  // Will submit everyone and then skip the errored records
  await Promise.all(dbActions).then(() =>
    update('Show', {
      where: { uid: existingShow.uid },
      data: { reviewed: true },
    }),
  );

  revalidateTag('Shows');
  revalidateTag('RiderCombos');
  return NextResponse.json(
    { success: true, message: 'Successfully updated points.' },
    { status: 200 },
  );
}
