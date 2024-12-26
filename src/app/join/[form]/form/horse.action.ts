'use server';

import { checkExistingHorses } from '@/server/prisma/queries/horses';
import { findUnique, update } from '@/server/prisma/queries/members';
import { upsert } from '@/server/prisma/queries/owner';
import { horseNames } from '@/server/router/utils';
import { HorseForm, OwnerHorseForm } from '@/utils/zodschemas';
import { Horse } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
  const existingHorses = await checkExistingHorses({
    where: {
      horseRN: {
        in: horses.map(horse => horse.horseRN),
      },
    },
  });

  console.log(existingHorses);
  console.log(horses);

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

  const existingMember = await findUnique({ where: { fullName } });
  if (existingMember) {
    console.info(
      `Updating current member ${fullName} with horses ${horseNames(horses)}`,
    );

    await update({
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
    try {
      await upsert({
        where: { fullName },
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

  return {
    message: 'Success',
    error: false,
    data: { ...owner, horses },
  };
}
