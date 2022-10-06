import { isHorsePayload } from '../../types/atoms';
import { Status } from '@prisma/client';

function isStatus(o: any): o is Status {
  return STATUS.includes(o as Status);
}

function isFormType(o: any): o is FormType {
  return FORMTYPE.includes(o as FormType);
}

const FORMTYPE = ['Individual', 'Business', 'Horse', undefined] as const;
type FormType = typeof FORMTYPE[number];

const STATUS = ['Life', 'Annual', 'Renew'] as const;

describe('Type predicate tests', () => {
  test('Horse Status', () => {
    const type: Status = 'Life';
    const falseType = 'Horse';

    expect(isStatus(type)).toBe(true);
    expect(isStatus(falseType)).toBe(false);
  });

  test('Form Type', () => {
    const type: FormType = 'Horse';
    const falseType = 'Life';

    expect(isFormType(type)).toBe(true);
    expect(isFormType(falseType)).toBe(false);
  });

  test('horse payload', () => {
    const payload = {
      lifeCount: 1,
      annualCount: 2,
    };
    const falsePayload = 'Individual';

    expect(isHorsePayload(payload)).toBe(true);
    expect(isHorsePayload(falsePayload)).toBe(false);
  });
});
