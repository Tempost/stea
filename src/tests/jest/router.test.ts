import { prisma } from '@/backend/prisma';
import { z } from 'zod';
import { faker } from '@faker-js/faker';

import { createContextInner } from '../../backend/prisma';
import { appRouter } from '../../backend/router/_app';
import { inferMutationInput, inferQueryInput } from '../../utils/trpc';
import {
  HorseModel,
  MemberModel,
  NonMemberHorseOwnerModel,
} from '@/backend/prisma/zod';
import { PaymentMethod, Prisma, PrismaPromise, Status } from '@prisma/client';

describe('tRPC router tests', () => {
  // In the case where records are left in the DB, delete all data from the tables
  afterAll(async () => {
    const transactions: PrismaPromise<any>[] = [];
    transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`);

    const tableNames = await prisma.$queryRaw<
      Array<{ TABLE_NAME: string }>
      >`SELECT TABLE_NAME from information_schema.TABLES WHERE TABLE_SCHEMA ='stea_test';`;

    for (const { TABLE_NAME } of tableNames) {
      if (TABLE_NAME !== '_prisma_migrations') {
        try {
          transactions.push(
            prisma.$executeRawUnsafe(`TRUNCATE stea_test.${TABLE_NAME}`)
          );
        } catch (error) {
          console.log({ error });
        }
      }
    }

    transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`);
    try {
      await prisma.$transaction(transactions);
    } catch (error) {
      console.log({ error });
    }
  });

  describe('Member api routes', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const fullName = faker.name.fullName({ firstName, lastName });
    const date = new Date();

    const horse: z.infer<typeof HorseModel> = {
      horseRN: faker.animal.horse(),
      regType: 'Life',
    };

    it('Add/Get member', async () => {
      const ctx = await createContextInner({});
      const caller = appRouter.createCaller(ctx);

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

      const newHorse = {
        horseRN: faker.animal.horse(),
        regType: 'Annual' as Status,
      };

      const input: inferMutationInput<'member.add-member'> = {
        member,
        horses: [newHorse],
        payment,
        division: 'GAG',
      };

      await caller.mutation('member.add-member', input);

      // Search for each new record and verify it is valid
      // Member rec
      const memberFromGet = await caller.query('member.get-member', {
        fullName: member.fullName,
      });
      expect(memberFromGet).toMatchObject(member);
    });

    it('update member horses/combos', async () => {
      const ctx = await createContextInner({});
      const caller = appRouter.createCaller(ctx);

      const member: z.infer<typeof NonMemberHorseOwnerModel> = {
        fullName,
        firstName,
        lastName,
        phone: faker.phone.number('###-###-####'),
        phoneType: 'Mobile',
        email: faker.internet.exampleEmail(firstName, lastName),
      };

      const combo: Prisma.RiderComboCreateManyInput = {
        memberName: fullName,
        horseName: horse.horseRN,
        division: 'GAG',
      };

      const input: inferMutationInput<'nonMemberHorseOwner.add-owner-horse'> = {
        combos: [combo],
        horses: [horse],
        owner: member,
      };

      await caller.mutation('nonMemberHorseOwner.add-owner-horse', input);
      const horseFromGet = await caller.query('horse.get-horse', {
        horseRN: horse.horseRN,
      });
      expect(horseFromGet).toMatchObject(horse);

      const comboFromGet = await caller.query('rider.get-rider', { ...combo });
      expect(comboFromGet.horse).toMatchObject(horseFromGet);
    });

    it('update member', async () => {
      const ctx = await createContextInner({});
      const caller = appRouter.createCaller(ctx);

      const mutationInput: inferMutationInput<'member.update-member'> = {
        fullName,
        memberStatus: 'Annual',
      };

      const updatedMember = await caller.mutation(
        'member.update-member',
        mutationInput
      );

      expect(updatedMember.memberStatus).toBe('Annual');
    });

    it('delete member', async () => {
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

  describe('testing owner apis', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    let fullName = faker.name.fullName({ firstName, lastName });

    const horse: z.infer<typeof HorseModel> = {
      horseRN: faker.animal.horse(),
      regType: 'Life',
    };
    it('Add/Get owner', async () => {
      const ctx = await createContextInner({});
      const caller = appRouter.createCaller(ctx);

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

    it('Update owner', async () => {
      const ctx = await createContextInner({});
      const caller = appRouter.createCaller(ctx);

      const newFirstName = faker.name.firstName();
      const newLastName = faker.name.lastName();
      const mutationInput: inferMutationInput<'nonMemberHorseOwner.update-owner'> =
      {
        ownerName: fullName,
        patch: {
          firstName: newFirstName,
          lastName: newLastName,
          fullName: faker.name.fullName({
            firstName: newFirstName,
            lastName: newLastName,
          }),
          email: faker.internet.email(),
        },
      };

      const updatedOwner = await caller.mutation(
        'nonMemberHorseOwner.update-owner',
        mutationInput
      );
      const ownerFromGet = await caller.query('nonMemberHorseOwner.get-owner', {
        ownerName: updatedOwner.fullName,
      });

      expect(updatedOwner.firstName).toBe(ownerFromGet.firstName);
      expect(updatedOwner.lastName).toBe(ownerFromGet.lastName);
      expect(updatedOwner.fullName).toBe(ownerFromGet.fullName);
      expect(updatedOwner.email).toBe(ownerFromGet.email);
      fullName = updatedOwner.fullName;
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

  describe('Shows api routes', () => {
    const showName = faker.address.county();
    const date = new Date();
    let showUid: string;

    it('add/get show', async () => {
      const ctx = await createContextInner({});
      const caller = appRouter.createCaller(ctx);

      const mutationInput: inferMutationInput<'shows.add'> = {
        showName: showName,
        showType: '???',
        showDate: date,
      };

      const newShow = await caller.mutation('shows.add', mutationInput);
      const showFromGet = await caller.query('shows.get-show', {
        uid: newShow.uid,
      });
      showUid = newShow.uid;

      expect(newShow.showName).toBe(showFromGet.showName);
      expect(newShow.showType).toBe(showFromGet.showType);
      expect(newShow.showDate).toMatchObject(showFromGet.showDate);
    });

    it('Update show', async () => {
      const ctx = await createContextInner({});
      const caller = appRouter.createCaller(ctx);

      const mutationInput: inferMutationInput<'shows.update'> = {
        uid: showUid,
        patch: {
          showName: faker.address.county(),
          showType: 'CT-Only',
          showDate: new Date(),
        },
      };

      const updatedShow = await caller.mutation('shows.update', mutationInput);
      const showFromGet = await caller.query('shows.get-show', {
        uid: updatedShow.uid,
      });

      expect(updatedShow.showName).toBe(showFromGet.showName);
      expect(updatedShow.showType).toBe(showFromGet.showType);
      expect(updatedShow.showDate).toMatchObject(showFromGet.showDate);
    });

    it('Delete show', async () => {
      const ctx = await createContextInner({});
      const caller = appRouter.createCaller(ctx);

      const mutationInput: inferMutationInput<'shows.remove-show'> = {
        uid: showUid,
      };

      const showFromGet = await caller.query('shows.get-show', {
        uid: showUid,
      });

      const deletedShow = await caller.mutation(
        'shows.remove-show',
        mutationInput
      );
      expect(deletedShow.showName).toBe(showFromGet.showName);
      expect(deletedShow.showType).toBe(showFromGet.showType);
      expect(deletedShow.showDate).toMatchObject(showFromGet.showDate);
    });
  });

  describe('Rider combo apis (including points)', () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const fullName = faker.name.fullName({ firstName, lastName });
    const showName = faker.address.county();
    const date = new Date();
    let showUID: string;
    let riderUID: string;

    const horse = {
      horseRN: faker.animal.horse(),
      regType: 'Life' as Status,
    };

    beforeAll(async () => {
      const ctx = await createContextInner({});
      const caller = appRouter.createCaller(ctx);

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
        division: 'GAG',
        member,
        horses: [horse],
      };

      await caller.mutation('member.add-member', input);
      const mutationInput: inferMutationInput<'shows.add'> = {
        showName: showName,
        showType: '???',
        showDate: date,
      };

      const newShow = await caller.mutation('shows.add', mutationInput);
      showUID = newShow.uid;
    });

    it('Get combo', async () => {
      const ctx = await createContextInner({});
      const caller = appRouter.createCaller(ctx);

      const combo: inferQueryInput<'rider.get-rider'> = {
        memberName: fullName,
        horseName: horse.horseRN,
      };

      const comboFromGet = await caller.query('rider.get-rider', { ...combo });
      expect(comboFromGet.member.fullName).toBe(fullName);
      expect(comboFromGet.horse.horseRN).toBe(horse.horseRN);
      riderUID = comboFromGet.uid;
    });

    it('Request for points change', async () => {
      // NOTE: Takes memberName, horseName, showDate/ShowName, new points to ammend
      const ctx = await createContextInner({});
      const caller = appRouter.createCaller(ctx);

      const requestUpdate: inferMutationInput<'points.update-points'> = {
        riderUID,
        showUID,
        ammendPoints: 1,
      };
      await caller.mutation('points.update-points', requestUpdate);
    });

    it('Delete combo', async () => {
      const ctx = await createContextInner({});
      const caller = appRouter.createCaller(ctx);

      const combo: inferMutationInput<'rider.remove-rider'> = {
        memberName: fullName,
        horseName: horse.horseRN,
      };
      const deletedMember = await caller.mutation('rider.remove-rider', combo);

      expect(deletedMember).toMatchObject(combo);
    });
  });

  describe('Point Submission from csv', () => {
    it('Submit via api', () => {

    });
  });
});
