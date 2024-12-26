'use server';
import { MemberForm } from '@/utils/zodschemas';
import {
  findUnique,
  upsert as upsertMember,
} from '@/server/prisma/queries/members';
import { checkForExistingHorses } from './horse.action';

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

  const existingMember = await findUnique({ where: { fullName } });
  if (existingMember) {
    if (existingMember.memberStatus === 'Life') {
      // TODO: Create an error class for this instead
      return {
        message: `${fullName} is already a lifetime member.`,
        error: true,
        data: formData,
      };
    }

    if (existingMember.membershipEnd && formData.membershipEnd) {
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

export async function addNewMember({
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

  await upsertMember({
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

  return {
    message: `Welcome ${fullName} to stea!`,
    error: false,
    data: { horses, ...member },
  };
}
