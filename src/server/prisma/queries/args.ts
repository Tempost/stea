import { setMembershipYear } from '@/utils/setmembershipyear';
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
    uid: true,
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

export const horseDashboardArgs = {
  orderBy: {
    registrationEnd: { sort: 'desc', nulls: 'last' },
  },
  select: {
    registrationDate: true,
    registrationEnd: true,
    horseRN: true,
    regType: true,
    memberName: true,
    owner: true,
  },
} satisfies Prisma.HorseFindManyArgs;

export type HorseDirectory = Prisma.HorseGetPayload<typeof horseDashboardArgs>;

export const memberDirectoryArgs = {
  orderBy: [
    { memberStatusType: 'asc' },
    { membershipEnd: { sort: 'desc', nulls: 'last' } },
  ],
  select: {
    fullName: true,
    memberStatusType: true,
    memberStatus: true,
    membershipDate: true,
    memberType: true,
    email: true,
    phone: true,
    membershipEnd: true,
  },
} satisfies Prisma.MemberFindManyArgs;

export type MemberDirectory = Prisma.MemberGetPayload<
  typeof memberDirectoryArgs
>;

export const nonMemberDirectoryArgs = {
  select: {
    fullName: true,
    email: true,
    phone: true,
    createdAt: true,
  },
} satisfies Prisma.NonMemberHorseOwnerFindManyArgs;

export type NonMemberHorseOwnerDirectory = Prisma.NonMemberHorseOwnerGetPayload<
  typeof nonMemberDirectoryArgs
>;

export const calendarArgs = {
  orderBy: {
    showDate: 'asc',
  },
  where: {
    reviewed: false,
  },
  select: {
    showDate: true,
    showEndDate: true,
    showName: true,
    showType: true,
    url: true,
  },
} satisfies Prisma.ShowFindManyArgs;

export type ShowCalendar = Prisma.ShowGetPayload<typeof calendarArgs>;

export const memberTableArgs = {
  where: {
    OR: [{ memberStatus: 'Life' }, { membershipEnd: setMembershipYear() }],
  },
  select: {
    fullName: true,
    memberStatusType: true,
    memberStatus: true,
  },
  orderBy: [
    {
      memberStatusType: 'asc',
    },
    { memberStatus: 'asc' },
  ],
} satisfies Prisma.MemberFindManyArgs;

export type Member = Prisma.MemberGetPayload<typeof memberTableArgs>;

export const horseTableArgs = {
  where: {
    OR: [{ regType: 'Life' }, { registrationEnd: setMembershipYear() }],
  },
  select: {
    horseRN: true,
    regType: true,
    owner: true,
    memberName: true,
  },
  orderBy: {
    regType: 'asc',
  },
} satisfies Prisma.HorseFindManyArgs;

export type Horse = Prisma.HorseGetPayload<typeof horseTableArgs>;
