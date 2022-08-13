import { JRSR, PaymentMethod, Prisma, Status, Type } from '@prisma/client';
import _ from 'lodash';

import { prisma } from '../backend/prisma';
import members from './members.json';
import horses from './horses.json';

async function cleanUp() {
  prisma.member.deleteMany({}).then(() => console.log('Members cleaned'));

  // await prisma.payment
  //   .deleteMany({})
  //   .then(() => console.log('Payments cleaned'));

  prisma.horse.deleteMany({}).then(() => console.log('Horses cleaned'));
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

async function addHorses() {
  console.log('Adding Horses...');
  const data = horses.map(horse => {
    return {
      createdAt: new Date(),
      horseRN: horse.horseRN.trim(),
      horseAKA: horse.horseAKA.trim(),
      registrationDate: _.isEmpty(horse.registrationDate)
        ? null
        : new Date(horse.registrationDate),
      regType: horse.regType as Status,
      notConnected: true,
    };
  });

  const riders = horses.map(horse => {
    let riders = new Array();
    if (horse.riders.includes(',')) {
      const riderNames = horse.riders
        .split(',')
        .map((rider: string) => rider.trim());
      riders.push({ riders: riderNames, horseRN: horse.horseRN });
    } else {
      riders.push({ riders: horse.riders, horseRN: horse.horseRN });
    }

    return riders;
  });

  const duplicates = dupes(data);
  console.log('duplicates', duplicates);

  // await prisma.horse
  //   .createMany({ data });

  return riders;
}

async function addMembers() {
  console.log('Adding Members...');
  members.forEach(async member => {
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

async function load() {
  const riders = await addHorses().catch(err => {
    console.log(err);
    process.exit(1);
  });

  console.log(riders);

  // await addMembers().catch(err => {
  //   console.log(err);
  //   process.exit(1);
  // });
}

cleanUp().then(() => load());
