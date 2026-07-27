import { Prisma } from '@prisma/client';

export const riderComboPlacingsArgs = {
  orderBy: [
    {
      division: 'desc',
    },
    {
      member: {
        memberStatusType: 'asc',
      },
    },
    {
      totalPoints: 'desc',
    },
  ],
  select: {
    member: {
      select: {
        fullName: true,
        memberStatusType: true,
      },
    },
    horse: {
      select: {
        horseRN: true,
      },
    },
    totalPoints: true,
    totalShows: true,
    division: true,
    showYear: true,
    points: {
      select: {
        uid: true,
        points: true,
        place: true,
        show: {
          select: {
            uid: true,
            showName: true,
            showType: true,
          },
        },
      },
    },
  },
} satisfies Prisma.RiderComboFindManyArgs;

export type RiderComboPlacings = Prisma.RiderComboGetPayload<
  typeof riderComboPlacingsArgs
>;
