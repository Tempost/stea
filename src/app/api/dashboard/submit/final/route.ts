import { findUnique, update, upsert } from '@/server/prisma/queries/shared';
import { EntrySubmissionSchema } from '@/utils/zodschemas';
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { checkAuth } from '@/auth';
import { prisma } from '@/server/prisma';

const currentDate = new Date();
const capDate = new Date();
capDate.setMonth(10);
capDate.setDate(30);

export const POST = checkAuth(async (req: NextRequest) => {
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

  const dbActions: Array<ReturnType<typeof upsert>> = [];
  let year = existingShow.showDate.getFullYear();

  if (year == currentDate.getFullYear() && existingShow.showDate > capDate) {
    year += 1;
  }

  await prisma.$transaction(
    async tx => {
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
          upsert(
            'RiderCombo',
            {
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
            },
            tx,
          ),
        );
      }

      await Promise.all(dbActions)
        .then(() =>
          update(
            'Show',
            {
              where: { uid: existingShow.uid },
              data: { reviewed: true },
            },
            tx,
          ),
        )
        .then(() =>
          console.log(
            'Successfully uploaded points for show: ',
            showUID,
            existingShow.showName,
          ),
        );
    },
    { timeout: 20000 },
  );

  revalidateTag('Shows');
  revalidateTag('RiderCombos');
  return NextResponse.json(
    { success: true, message: 'Successfully updated points.' },
    { status: 200 },
  );
  // WARN: REMOVE THIS WHEN https://github.com/nextauthjs/next-auth/issues/12224 is fixed
}) as any;
