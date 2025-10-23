import { createServerFn } from '@tanstack/react-start';
import { findFirst, upsert } from '@/server/prisma/queries/shared';
import { MemberForm } from '@/utils/zodschemas';
import { checkForExistingHorses } from './horse';

export interface ActionState {
  message: string | undefined;
  error: boolean;
  data: MemberForm | undefined;
}

export const checkForExistingMember = createServerFn()
  .inputValidator((data: MemberForm) => data)
  .handler(async ({ data }): Promise<ActionState> => {
    const fullName = data.businessName ?? `${data.firstName} ${data.lastName}`;

    console.info(
      `Checking if ${fullName} has registered for the ${data.membershipEnd?.getFullYear()} show year.`,
    );

    const existingMember = await findFirst('Member', {
      where: { fullName: { equals: fullName, mode: 'insensitive' } },
    });
    if (existingMember) {
      if (existingMember.memberStatus === 'Life') {
        // TODO: Create an error class for this instead
        return {
          message: `${fullName} is already a lifetime member.`,
          error: true,
          data: data,
        };
      }

      if (
        existingMember.membershipEnd &&
        data.membershipEnd &&
        data.memberStatus != 'Life'
      ) {
        if (
          existingMember.membershipEnd.getFullYear() >=
          data.membershipEnd.getFullYear()
        ) {
          return {
            message: `${fullName} is already registered for the selected year.`,
            error: true,
            data: data,
          };
        }
      }
    }

    if (data.horses !== undefined) {
      return {
        ...(await checkForExistingHorses({ data: data.horses })),
        data: data,
      };
    }

    return {
      message: 'Success',
      error: false,
      data: data,
    };
  });

/**
 * Add a new member with or without any horses to the database.
 * If an existing user/horses are found then it will update. Otherwise
 * we just create the records and associate them together.
 *
 * @param {MemberForm} form
 */
export const upsertMember = createServerFn()
  .inputValidator((data: MemberForm) => data)
  .handler(async ({ data }): Promise<ActionState> => {
    const { horses, ...member } = data;
    console.info(`Member: ${JSON.stringify(member)}`);
    console.info(
      horses ? `Horses: ${JSON.stringify(horses)}` : 'Did not register horses',
    );

    const fullName =
      member.businessName ??
      `${member.firstName.trim()} ${member.lastName.trim()}`;

    const horseUpsert = horses?.map(horse => {
      return {
        where: { horseRN: horse.horseRN },
        update: {
          ...horse,
        },
        create: {
          ...horse,
        },
      };
    });

    await upsert('Member', {
      where: {
        fullName,
      },
      create: {
        fullName,
        Horse: {
          createMany: {
            data: horses ? horses : [],
          },
        },
        ...member,
      },
      update: {
        fullName,
        Horse: {
          upsert: horses ? horseUpsert : [],
        },
        ...member,
        membershipDate: new Date(),
      },
    });

    // TODO: Revalidate the cache
    return {
      message: `Welcome ${fullName} to stea!`,
      error: false,
      data: { horses, ...member },
    };
  });
