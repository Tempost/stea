import { create } from '@/server/prisma/queries/shared';
import { HorseOptionalDefaults } from '@/server/prisma/zod-generated/modelSchema/HorseSchema';
import { setMembershipYear } from '@/server/router/utils';
import { Horse } from '@prisma/client';

export interface ActionState {
  message: string;
  error: boolean;
  data?: Horse;
}

export default async function add(horse: HorseOptionalDefaults) {
  if (horse.regType === 'Annual') {
    horse.registrationEnd = setMembershipYear();
  }

  if (horse.memberName !== null) {
    const newHorse = create('Horse', {
      data: {
        horseRN: horse.horseRN,
        regType: horse.regType,
        horseAKA: horse.horseAKA,
        registrationEnd: horse.registrationEnd,
        memberOwner: {
          connect: {
            fullName: horse.memberName,
          },
        },
      },
    });

    return {
      message: 'Success',
      error: false,
      data: await newHorse,
    };
  }

  if (horse.owner !== null) {
    const newHorse = create('Horse', {
      data: {
        horseRN: horse.horseRN,
        regType: horse.regType,
        horseAKA: horse.horseAKA,
        registrationEnd: horse.registrationEnd,
        ownerRec: {
          connect: {
            fullName: horse.owner,
          },
        },
      },
    });
    return {
      message: 'Success',
      error: false,
      data: await newHorse,
    };
  }

  return {
    message: 'Please select either a member or an owner to add the horse',
    error: true,
  };
}
