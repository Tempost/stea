import { createContextInner } from '../../backend/prisma';
import { appRouter } from '../../backend/router/_app';
import { inferMutationInput, inferQueryInput } from '../../utils/trpc';
import { z } from 'zod';
import { faker } from '@faker-js/faker';
import {
  HorseModel,
  MemberModel,
  NonMemberHorseOwnerModel,
  PaymentModel,
} from '@/backend/prisma/zod';
import { Payment, PaymentMethod } from '@prisma/client';

const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const fullName = faker.name.fullName({ firstName, lastName });
const date = new Date();

describe('testing owner apis', () => {
  it('Add/Get owner', async () => {
    const ctx = await createContextInner({});
    const caller = appRouter.createCaller(ctx);

    const horse: z.infer<typeof HorseModel> = {
      horseRN: faker.animal.horse(),
      regType: 'Life',
    };

    const owner: z.infer<typeof NonMemberHorseOwnerModel> = {
      fullName,
      firstName,
      lastName,
      phone: faker.phone.number('###-###-####'),
      phoneType: 'Mobile',
      email: faker.internet.exampleEmail(firstName, lastName),
    };

    const input: inferMutationInput<'nonMemberHorseOwner.add-owner-horse'> = {
      horses: [horse],
      owner: owner,
    };

    // Add new owner to the DB
    await caller.mutation('nonMemberHorseOwner.add-owner-horse', input);

    // Search for each new record and verify it is valid
    // Owner rec
    const ownerFromGet = await caller.query('nonMemberHorseOwner.get-owner', {
      ownerName: owner.fullName,
    });

    expect(ownerFromGet).toMatchObject(owner);
  });

  it('Delete owner', async () => {
    const ctx = await createContextInner({});
    const caller = appRouter.createCaller(ctx);

    const queryInput: inferQueryInput<'nonMemberHorseOwner.get-owner'> = {
      ownerName: fullName,
    };

    const mutationInput: inferMutationInput<'nonMemberHorseOwner.remove-owner'> =
      {
        ownerName: fullName,
      };

    // Get record to compare objects first
    const ownerFromGet = await caller.query(
      'nonMemberHorseOwner.get-owner',
      queryInput
    );
    // Delete the record
    const ownerFromDelete = await caller.mutation(
      'nonMemberHorseOwner.remove-owner',
      mutationInput
    );

    expect(ownerFromDelete).toMatchObject(ownerFromGet);
  });
});

describe('Member api routes', () => {
  it('Add/Get member', async () => {
    const ctx = await createContextInner({});
    const caller = appRouter.createCaller(ctx);

    const horse: z.infer<typeof HorseModel> = {
      horseRN: faker.animal.horse(),
      regType: 'Life',
    };

    const payment = {
      amountPaid: 50,
      paymentMethod: 'PayPal' as PaymentMethod,
      comments:
        'This is coming from a test, if everything works ok it gets delete via cascade (:',
    };

    const member: z.infer<typeof MemberModel> = {
      fullName,
      firstName,
      lastName,
      phone: faker.phone.number('###-###-####'),
      phoneType: 'Mobile',
      email: faker.internet.exampleEmail(firstName, lastName),
      boardMember: false,
      address: faker.address.street(),
      city: faker.address.cityName(),
      state: faker.address.street(),
      confirmed: false,
      currentUSEAMember: false,
      memberType: 'Business',
      memberStatus: 'Life',
      JRSR: 'JR',
      dateOfBirth: date,
      zip: parseInt(faker.address.zipCodeByState('TX')),
    };

    const input: inferMutationInput<'member.add-member'> = {
      member,
      horses: [horse],
      payment,
    };

    await caller.mutation('member.add-member', input);

    // Search for each new record and verify it is valid
    // Member rec
    const memberFromGet = await caller.query('member.get-member', {
      fullName: member.fullName,
    });
    expect(memberFromGet).toMatchObject(member);
  });

  test('delete member', async () => {
    const ctx = await createContextInner({});
    const caller = appRouter.createCaller(ctx);

    const queryInput: inferQueryInput<'member.get-member'> = {
      fullName,
    };

    const mutationInput: inferMutationInput<'member.remove-member'> = {
      fullName,
    };

    // Get record to compare objects first
    const memberFromGet = await caller.query('member.get-member', queryInput);
    // Delete the record
    const memberFromDelete = await caller.mutation(
      'member.remove-member',
      mutationInput
    );

    expect(memberFromDelete).toMatchObject(memberFromGet);
  });
});
