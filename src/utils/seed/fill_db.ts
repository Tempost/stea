import members from './members.json';
import horses from './horses.json';
import { JRSR, Prisma, Status } from '@prisma/client';
import { Type } from '@prisma/client';

export default function fill(mutator: any) {
  horses.forEach(horse => {
    let horseDB: Prisma.HorseCreateInput;
    let arr = new Array<string>();
    if (horse.riders.includes(',')) {
      arr = horse.riders.split(',').map((rider: string) => rider.trim());
    } else {
      arr.push(horse.riders);
    }

    horseDB = {
      createdAt: new Date(),
      horseRN: horse.horseRN,
      horseAKA: horse.horseAKA,
      registrationDate: horse.horseRN === '' ? null : new Date(horse.horseRN),
      regType: horse.regType as Status,
      notConnected: true,
    };
    mutator.mutate({ horse: horseDB });
  });

  members.forEach(member => {
    let memberDB: Prisma.MemberCreateInput;
    memberDB = {
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
      zip: member.zip === '' ? 0 : parseInt(member.zip),
      phone: member.phone,
      email: member.email,
      comments: member.comments,
      confirmed: true,
    };

    mutator.mutate({ member: memberDB });
  });
}
