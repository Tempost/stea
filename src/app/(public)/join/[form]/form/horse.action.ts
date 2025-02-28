'use server';

import {
  findFirst,
  findMany,
  update,
  upsert,
} from '@/server/prisma/queries/shared';
import { horseNames } from '@/server/utils';
import { HorseForm, OwnerHorseForm } from '@/utils/zodschemas';
import { Horse } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { revalidateTag } from 'next/cache';

export interface OwnerActionState {
  message: string | undefined;
  error: boolean;
  data: OwnerHorseForm | undefined;
}

interface HorseActionState {
  message: string | undefined;
  error: boolean;
  data: HorseForm | undefined;
}

export async function checkForExistingHorses(
  horses: HorseForm,
): Promise<HorseActionState> {
  console.log(`Checking for horses... ${horseNames(horses)}`);
  const existingHorses = await findMany('Horse', {
    where: {
      horseRN: {
        in: horses.map(horse => horse.horseRN),
        mode: 'insensitive',
      },
    },
  });

  if (existingHorses) {
    const signedUp: Array<Horse> = [];
    existingHorses.forEach(horse => {
      if (horse.regType === 'Life') {
        signedUp.push(horse);
      } else {
        if (horse.registrationEnd) {
          const horseInput = horses.find(h => h.horseRN === horse.horseRN);
          if (horseInput && horseInput.registrationEnd) {
            if (
              horse.registrationEnd.getFullYear() >=
              horseInput.registrationEnd.getFullYear()
            ) {
              signedUp.push(horse);
            }
          }
        }
      }
    });

    if (signedUp.length > 0) {
      const message = `${horseNames(signedUp)}
        ${signedUp.length > 1 ? 'have' : 'has'} already been registered.`;

      return {
        message: message,
        error: true,
        data: horses,
      };
    }
  }

  return {
    message: 'Success',
    error: false,
    data: horses,
  };
}

export async function addOwner({
  horses,
  ...owner
}: OwnerHorseForm): Promise<OwnerActionState> {
  const fullName = `${owner.firstName} ${owner.lastName}`;
  console.info(`Owner: ${JSON.stringify(owner)}`);
  console.info(
    horses ? `Horses: ${JSON.stringify(horses)}` : 'Did not register horses',
  );

  // If the name from the form exists as a current member
  // then we should update/add the horses for them (currently registered or not)
  // otherwise we can just upsert via the newHorseOwnerMember table

  const existingMember = await findFirst('Member', {
    where: { fullName: { equals: fullName, mode: 'insensitive' } },
  });
  if (existingMember) {
    console.info(
      `Updating current member ${fullName} with horses ${horseNames(horses)}`,
    );

    await update('Member', {
      where: { fullName },
      data: {
        Horse: {
          upsert: horses.map(horse => {
            return {
              where: { horseRN: horse.horseRN },
              create: { ...horse },
              update: { ...horse },
            };
          }),
        },
      },
    });
  } else {
    console.info(`Adding new owner ${fullName}...`);
    const existingOwner = await findFirst('NonMemberHorseOwner', {
      where: {
        fullName: {
          equals: fullName,
          mode: 'insensitive',
        },
      },
    });

    try {
      await upsert('NonMemberHorseOwner', {
        where: { fullName: existingOwner ? existingOwner.fullName : fullName },
        create: {
          fullName,
          ...owner,
          horses: {
            createMany: {
              data: [...horses],
            },
          },
        },
        update: {
          horses: {
            upsert: horses.map(horse => {
              return {
                where: { horseRN: horse.horseRN },
                create: { ...horse },
                update: { ...horse },
              };
            }),
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(`Unable to add ${fullName} due to ${error.cause}`);
        return {
          message: error.message,
          error: true,
          data: { ...owner, horses },
        };
      }
    }
  }

  revalidateTag('Owners');
  revalidateTag('Horses');
  return {
    message: 'Success',
    error: false,
    data: { ...owner, horses },
  };
}
