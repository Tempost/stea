'use server';
import { MemberForm } from '@/utils/zodschemas';
import { checkForExistingHorses } from './horse.action';
import { findFirst, upsert } from '@/server/prisma/queries/shared';
import { revalidateTag } from 'next/cache';

export interface ActionState {
  message: string | undefined;
  error: boolean;
  data: MemberForm | undefined;
}

export async function checkForExistingMember(
  formData: MemberForm,
): Promise<ActionState> {
  const fullName =
    formData.businessName ?? `${formData.firstName} ${formData.lastName}`;

  console.info(
    `Checking if ${fullName} has registered for the ${formData.membershipEnd?.getFullYear()} show year.`,
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
        data: formData,
      };
    }

    if (
      existingMember.membershipEnd &&
      formData.membershipEnd &&
      formData.memberStatus != 'Life'
    ) {
      if (
        existingMember.membershipEnd.getFullYear() >=
        formData.membershipEnd.getFullYear()
      ) {
        return {
          message: `${fullName} is already registered for the selected year.`,
          error: true,
          data: formData,
        };
      }
    }
  }

  if (formData.horses !== undefined) {
    return {
      ...(await checkForExistingHorses(formData.horses)),
      data: formData,
    };
  }

  return {
    message: 'Success',
    error: false,
    data: formData,
  };
}

/**
 * Add a new member with or without any horses to the database.
 * If an existing user/horses are found then it will update. Otherwise
 * we just create the records and associate them together.
 *
 * @param {MemberForm} form
 */
export async function upsertMember({
  horses,
  ...member
}: MemberForm): Promise<ActionState> {
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

  revalidateTag('Members');
  revalidateTag('Horses');
  return {
    message: `Welcome ${fullName} to stea!`,
    error: false,
    data: { horses, ...member },
  };
}
