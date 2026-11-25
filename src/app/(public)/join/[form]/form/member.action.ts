'use server';
import { MemberForm } from '@/utils/zodschemas';
import { checkForExistingHorses } from './horse.action';
import { findFirst, upsert } from '@/server/prisma/queries/shared';
import { prisma } from '@/server/prisma';
import { updateTag } from 'next/cache';

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

  // Upsert horses by id, not nested: nested upsert is scoped to the member
  // relation and re-creates (P2002) horses linked via `owner`. New horses
  // link to this member; existing horses renew in place without touching
  // owner/memberName, so leased horses stay linked to their owner.
  await prisma.$transaction(async tx => {
    await upsert(
      'Member',
      {
        where: { fullName },
        create: { fullName, ...member },
        update: { ...member, membershipDate: new Date() },
      },
      tx,
    );

    for (const horse of horses ?? []) {
      await upsert(
        'Horse',
        {
          where: { horseRN: horse.horseRN },
          create: { ...horse, memberName: fullName },
          update: { ...horse },
        },
        tx,
      );
    }
  });

  updateTag('Members');
  updateTag('Horses');
  return {
    message: `Welcome ${fullName} to stea!`,
    error: false,
    data: { horses, ...member },
  };
}
