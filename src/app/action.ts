'use server';
import { MemberForm } from '@/utils/zodschemas';
import { ActionState } from './join/[form]/form/individual';

export async function checkForExistingMember(
  formData: MemberForm,
): Promise<ActionState> {
  console.log(formData);
  return {
    message: `${formData.firstName} ${formData.lastName} has already registered`,
    error: false,
    data: formData,
  };
}
