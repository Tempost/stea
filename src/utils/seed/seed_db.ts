import { Prisma, PrismaPromise, Status, Type } from '@prisma/client';

import { prisma } from '../../backend/prisma';
import members from './members.json';
import horses from './horses.json';
import { removeUndefined } from '../helpers';

async function cleanUp() {
  // const transactions: PrismaPromise<any>[] = [];
  // transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`);
  // const tableNames = await prisma.$queryRaw<
  //   Array<{ TABLE_NAME: string }>
  // >`SELECT TABLE_NAME from information_schema.TABLES WHERE TABLE_SCHEMA ='stea';`;
  // for (const { TABLE_NAME } of tableNames) {
  //   if (TABLE_NAME !== '_prisma_migrations') {
  //     try {
  //       transactions.push(
  //         prisma.$executeRawUnsafe(`TRUNCATE stea.${TABLE_NAME}`)
  //       );
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   }
  // }
  // transactions.push(prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`);
  // try {
  //   return prisma.$transaction(transactions);
  // } catch (error) {
  //   console.log({ error });
  // }
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
      } as Prisma.HorseCreateInput;
    });

  const noUndefinedData = removeUndefined<Prisma.HorseCreateInput>(data);
  await prisma.horse.createMany({ data: noUndefinedData });
}

async function seedMembers() {
  console.log('Adding Members...');
  const dbActions = members
    .filter(member => member.memberStatus === 'Life')
    .map(async member => {
      const horses = member.horses.split(',');
      const validHorses = await prisma.horse.findMany({
        where: {
          horseRN: { in: horses },
        },
      });

      const memberDB: Prisma.MemberCreateInput = {
        createdAt: new Date(),
        firstName: member.firstName,
        lastName: member.lastName,
        fullName: member.fullName,
        membershipDate: new Date(member.membershipDate),
        memberType: member.memberType as Type,
        memberStatus: member.memberStatus as Status,
        memberStatusType: 'AdultAmateur',
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

      return await prisma.member.create({
        data: {
          ...memberDB,
          Horse: {
            connect:
              validHorses.map(horse => {
                return { horseRN: horse.horseRN };
              }) || [],
          },
        },
      });
    });

  return dbActions;
}

cleanUp()
  .then(async () => {
    await seedHorses().catch(err => {
      console.log(err);
      process.exit(1);
    });
  })
  .then(async () => {
    await seedMembers().catch(err => {
      console.log(err);
      process.exit(1);
    });
  });
