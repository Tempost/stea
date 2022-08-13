import { JRSR, PaymentMethod, Prisma, Status, Type } from '@prisma/client';
import _ from 'lodash';

import { prisma } from '../backend/prisma';
import members from './members.json';
import horses from './horses.json';

interface Rider {
  riders: string | string[];
  horseRN: string;
}

async function cleanUp() {
  await prisma.horse.deleteMany({}).then(() => console.log('Horses cleaned'));
  await prisma.member.deleteMany({}).then(() => console.log('Members cleaned'));
}

function dupes<T>(data: T) {
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

  const data = horses.map(horse => {
    if (_.isEqual(horse.regType, 'Annual') || _.isEqual(horse.regType, 'Renew'))
      return;

    return {
      createdAt: new Date(),
      horseRN: horse.horseRN.trim(),
      horseAKA: horse.horseAKA.trim(),
      registrationDate: _.isEmpty(horse.registrationDate)
        ? null
        : new Date(horse.registrationDate),
      regType: horse.regType as Status,
      notConnected: true
    } as Prisma.HorseCreateInput;
  });

  const riders: Rider[] = horses.map(horse => {
    let rider: Rider;

    const riderNames = horse.riders
      .split(',')
      .map((rider: string) => rider.trim());

    rider = { riders: riderNames, horseRN: horse.horseRN };
    return rider;
  });

  const noUndefinedData = removeUndefined<Prisma.HorseCreateInput>(data);
  await prisma.horse.createMany({ data: noUndefinedData });

  return riders;
}

function removeUndefined<T>(data: (T | undefined)[]) {
  return data.filter((item: any): item is T => item !== undefined);
}

async function seedMembers() {
  console.log('Adding Members...');
  members.forEach(async member => {
    if (
      _.isEqual(member.memberStatus, 'Annual') ||
      _.isEqual(member.memberStatus, 'Renew')
    )
      return;

    const memberDB: Prisma.MemberCreateInput = {
      createdAt: new Date(),
      updatedAt: new Date(),
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
      zip: _.isEmpty(member.zip) ? 0 : parseInt(member.zip),
      phone: member.phone,
      email: member.email,
      comments: member.comments,
      confirmed: true,
    };

    const paymentDB: Prisma.PaymentCreateWithoutMemberInput = {
      amountPaid: member.amountPaid,
      updatedAt: new Date(),
      datePaid: new Date(member.datePaid),
      paymentMethod: member.paymentMethod as PaymentMethod,
      checkNumber: member.checkNumber,
      comments: member['Additional Payment(s)'],
    };

    await prisma.member.create({
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
}

async function addCombo(fullName: string, horseRN: string) {
  const member = await prisma.member
    .findUnique({
      where: {
        fullName,
      },
    });

  const horse = await prisma.horse
    .findUnique({
      where: {
        horseRN
      },
    });

  if (!_.isNull(member) && !_.isNull(horse)) {
    await prisma.riderCombo.create({
      data: {
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

  seedMembers().catch(err => {
    console.log(err);
    process.exit(1);
  });

  seedRiders(riders).catch(err => {
    console.log(err.cause);
    process.exit(1);
  });
}

cleanUp().then(() => load());
