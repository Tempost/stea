import cuid from 'cuid';
import members from './members.json';
import horses from './horses.json';
import { Horse, JRSR, Member, Payment, PaymentMethod, Status, Type } from '@prisma/client';

interface NewPayment extends Omit<Payment, 'memberUid'> {
  memberUid?: string;
}

interface NewMember extends Omit<Member, 'uid'> {
  uid?: string;
}

export default function fill(mutator: any) {
  console.log(mutator);

  horses.forEach((horse) => {
    let horseDB: Horse;
    let horseCUID = cuid();

    let arr = new Array<string>();
    if (horse.riders.includes(',')) {
      arr = horse.riders.split(',').map((rider: string) => rider.trim());
    } else {
      arr.push(horse.riders);
    }

    horseDB = {
      uid: cuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      horseRN: horse.horseRN,
      horseAKA: horse.horseAKA,
      registrationDate: new Date(horse['horseRN']),
      regType: horse.regType as Type,
      corpUid: null,
      rankingUid: null
    };
  })

  members.every((member) => {
    let paymentDB: NewPayment;
    let memberDB: Member;
    const memberCUID = cuid();
    const paymentCUID = cuid();

    memberDB = {
      uid: memberCUID,
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
      zip: parseInt(member.zip),
      phone: member.phone,
      email: member.email,
      comments: member.comments,
      previousMember: true,
      riderLevel: '',
      confirmed: true,
    };

    paymentDB = {
      uid: paymentCUID,
      amountPaid: member.amountPaid,
      updatedAt: new Date(),
      datePaid: new Date(member.datePaid),
      paymentMethod: member.paymentMethod as PaymentMethod,
      checkNumber: member.checkNumber,
      comments: member['Additional Payment(s)'],
    };

    mutator.mutate({ member: memberDB, payment: paymentDB });

    return false;
  });
}
