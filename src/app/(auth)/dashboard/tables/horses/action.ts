'use server';
import { create } from '@/server/prisma/queries/shared';
import { HorseOptionalDefaults } from '@/server/prisma/zod-generated/modelSchema/HorseSchema';
import { setMembershipYear } from '@/utils/setmembershipyear';
import { Horse } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { revalidateTag } from 'next/cache';

export interface ActionState {
  message: string;
  error: boolean;
  data?: Horse;
}

export default async function add(horse: HorseOptionalDefaults) {
  if (horse.regType === 'Annual') {
    horse.registrationEnd = setMembershipYear();
  }

  try {
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

      revalidateTag('Horses');
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

      revalidateTag('Horses');
      return {
        message: 'Success',
        error: false,
        data: await newHorse,
      };
    }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(`${horse.horseRN} is already registered`);

      if (error.code === 'P2002')
        return {
          message: `${horse.horseRN} is already registered`,
          error: true,
          data: undefined,
        };

      return {
        message: 'Unknown error.',
        error: true,
        data: undefined,
      };
    }
  }

  return {
    message: 'Please select either a member or an owner to add the horse',
    error: true,
  };
}
