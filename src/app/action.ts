'use server';
import { MemberForm } from '@/utils/zodschemas';
import { ActionState } from './join/[form]/form/individual';
import { findUnique } from '@/server/prisma/queries/members';
import { checkExistingHorses } from '@/server/prisma/queries/horses';
import { horseNames } from '@/server/router/utils';

export async function checkForExistingMember(
  formData: MemberForm,
): Promise<ActionState> {
  const fullName =
    formData.businessName ?? `${formData.firstName} ${formData.lastName}`;

  console.info(
    `Checking if ${fullName} has registered already for the ${formData.membershipEnd?.getFullYear()} show year.`,
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
    console.log(`Checking for horses... ${horseNames(formData.horses)}`);
    const existingHorses = await checkExistingHorses({
      where: {
        horseRN: {
          in: formData.horses.map(horse => horse.horseRN),
        },
      },
    });

    if (existingHorses) {
      const signedUp: typeof existingHorses | undefined = [];
      existingHorses.forEach(existingHorse => {
        if (existingHorse.regType === 'Life') {
          signedUp.push(existingHorse);
        } else {
          // NOTE: This is here just incase registrationEnd is null/empty
          if (existingHorse.registrationEnd) {
            const horseInput = formData.horses?.find(
              h => h.horseRN === existingHorse.horseRN,
            );
            if (horseInput && horseInput.registrationEnd) {
              if (
                existingHorse.registrationEnd.getFullYear() >=
                horseInput.registrationEnd.getFullYear()
              ) {
                signedUp.push(existingHorse);
              }
            }
          }
        }
      });

      if (signedUp.length > 0) {
        const message = `${horseNames(signedUp)} ${
          signedUp.length > 1 ? 'have' : 'has'
        } already been registered.`;

        return {
          message: message,
          error: true,
          data: formData,
        };
      }
    }
  }
  return {
    message: 'Success',
    error: false,
    data: formData,
  };
}

export async function addNewMember(formData: MemberForm): Promise<ActionState> {
  return {
    message: `Welcome ${formData.firstName} ${formData.lastName} to stea!`,
    error: false,
    data: formData,
  };
}
