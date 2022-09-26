import {
  JRSR,
  PaymentMethod,
  Prisma,
  PrismaPromise,
  Status,
  Type,
} from '@prisma/client';

import { prisma } from '../../backend/prisma';
import members from './members.json';
import horses from './horses.json';
import { removeUndefined } from '../helpers';

interface Rider {
  riders: string | string[];
  horseRN: string;
}

async function cleanUp() {
  const transactions: PrismaPromise<any>[] = [];
  transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`);

  const tableNames = await prisma.$queryRaw<
    Array<{ TABLE_NAME: string }>
  >`SELECT TABLE_NAME from information_schema.TABLES WHERE TABLE_SCHEMA ='stea';`;

  for (const { TABLE_NAME } of tableNames) {
    if (TABLE_NAME !== '_prisma_migrations') {
      try {
        transactions.push(
          prisma.$executeRawUnsafe(`TRUNCATE stea.${TABLE_NAME}`)
        );
      } catch (error) {
        console.log({ error });
      }
    }
  }

  transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`);
  try {
    return prisma.$transaction(transactions);
  } catch (error) {
    console.log({ error });
  }
}

function findDupes<T>(data: T) {
  let duplicates = new Array<Prisma.HorseCreateInput>();
  if (Array.isArray(data)) {
    data.forEach((el, i) => {
      data.forEach((element, index) => {
        if (i === index) return null;
        if (element.horseRN === el.horseRN) {
          if (!duplicates.includes(el)) duplicates.push(el);
        }
      });
    });
  }

  return duplicates;
}

async function seedHorses() {
  console.log('Adding Horses...');

  const data = horses
    .filter(horse => horse.regType === 'Life')
    .map(horse => {
      return {
        createdAt: new Date(),
        horseRN: horse.horseRN.trim(),
        horseAKA: horse.horseAKA.trim(),
        registrationDate:
          horse.registrationDate === ''
            ? null
            : new Date(horse.registrationDate),
        regType: horse.regType as Status,
        notConnected: true,
      } as Prisma.HorseCreateInput;
    });

  const riders: Rider[] = horses.map(horse => {
    return {
      riders: horse.riders.split(',').map(rider => rider.trim()),
      horseRN: horse.horseRN,
    };
  });

  const noUndefinedData = removeUndefined<Prisma.HorseCreateInput>(data);
  await prisma.horse.createMany({ data: noUndefinedData });

  return riders;
}

async function seedMembers() {
  console.log('Adding Members...');
  const dbActions = members
    .filter(member => member.memberStatus === 'Life')
    .map(async member => {
      const memberDB: Prisma.MemberCreateInput = {
        createdAt: new Date(),
        firstName: member.firstName,
        lastName: member.lastName,
        fullName: member.fullName,
        membershipDate: new Date(member.membershipDate),
        memberType: member.memberType as Type,
        memberStatus: member.memberStatus as Status,
        JRSR: member.JRSR as JRSR,
        boardMember: false,
        address: member.address,
        city: member.city,
        state: member.state,
        zip: member.zip === '' ? 0 : parseInt(member.zip),
        phone: member.phone,
        email: member.email,
        comments: member.comments,
        confirmed: true,
      };

      const paymentDB: Prisma.PaymentCreateWithoutMemberInput = {
        amountPaid: member.amountPaid,
        datePaid: new Date(member.datePaid),
        paymentMethod: member.paymentMethod as PaymentMethod,
        checkNumber: member.checkNumber,
        comments: member['Additional Payment(s)'],
      };

      return await prisma.member.create({
        data: {
          ...memberDB,
          payment: {
            create: {
              ...paymentDB,
            },
          },
        },
      });
    });

  return dbActions;
}

async function addCombo(fullName: string, horseRN: string) {
  const member = await prisma.member.findUnique({
    where: {
      fullName,
    },
  });

  const horse = await prisma.horse.findUnique({
    where: {
      horseRN,
    },
  });

  if (member !== null && horse !== null) {
    await prisma.riderCombo.create({
      data: {
        division: '',
        member: {
          connect: {
            fullName,
          },
        },
        horse: {
          connect: {
            horseRN,
          },
        },
      },
    });
  }
}

async function seedRiders(riders: Rider[]) {
  console.log('Adding Riders...');
  riders.forEach(async rider => {
    if (Array.isArray(rider.riders)) {
      rider.riders.forEach(async fullName => {
        addCombo(fullName, rider.horseRN);
      });
    } else {
      addCombo(rider.riders, rider.horseRN);
    }
  });
}

async function load() {
  const riders = await seedHorses().catch(err => {
    console.log(err);
    process.exit(1);
  });

  console.log(riders.length);

  const newMembers = await seedMembers().catch(err => {
    console.log(err);
    process.exit(1);
  });

  console.log(newMembers.length);

  await seedRiders(riders).catch(err => {
    console.log(err.cause);
    process.exit(1);
  });
}

cleanUp().then(res => {
  console.log(res);
  load();
});
