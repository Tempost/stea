import { findMany } from '@/server/prisma/queries/shared';
import { setMembershipYear } from '@/utils/setmembershipyear';
import { createServerFn } from '@tanstack/react-start';

export const getBoardMembers = createServerFn({ method: 'GET' }).handler(
  async () => findMany('Boardmember'),
);

export const getRiders = createServerFn({ method: 'GET' }).handler(async () =>
  findMany('RiderCombo', {
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
      shows: true,
      totalPoints: true,
      totalShows: true,
      division: true,
      showYear: true,
    },
  }),
);

export const getHorses = createServerFn({ method: 'GET' }).handler(async () =>
  findMany('Horse', {
    where: {
      OR: [{ regType: 'Life' }, { registrationEnd: setMembershipYear() }],
    },
    select: {
      horseRN: true,
      regType: true,
      owner: true,
    },
    orderBy: {
      regType: 'asc',
    },
  }),
);

export const getMembers = createServerFn({ method: 'GET' }).handler(async () =>
  findMany('Member', {
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
  }),
);

export const getMembersAndPoints = createServerFn({ method: 'GET' }).handler(
  async () => {
    const members = findMany('Member', {
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
    });

    const horses = findMany('Horse', {
      where: {
        OR: [{ regType: 'Life' }, { registrationEnd: setMembershipYear() }],
      },
      select: {
        horseRN: true,
        regType: true,
        owner: true,
      },
      orderBy: {
        regType: 'asc',
      },
    });

    return { members: await members, horses: await horses };
  },
);

export const getShows = createServerFn({ method: 'GET' }).handler(async () =>
  findMany('Show', {
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
    },
  }),
);

const CURR_MONTH = new Date();
const MONTH_FROM_CURR = new Date(
  CURR_MONTH.getFullYear(),
  CURR_MONTH.getMonth() + 1,
  CURR_MONTH.getDate(),
);
export const getEvents = createServerFn({ method: 'GET' }).handler(async () =>
  findMany('Show', {
    where: {
      showDate: {
        lte: MONTH_FROM_CURR,
        gte: CURR_MONTH,
      },
    },
    orderBy: {
      showDate: 'asc',
    },
    select: {
      showDate: true,
      showEndDate: true,
      showName: true,
      showType: true,
    },
  }),
);
