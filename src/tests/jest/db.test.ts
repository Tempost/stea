import { Horse, Member, PhoneType, Status, Type } from '@prisma/client';
import { MockContext, Context, createMockContext } from './context';
import { createMember, createMemberWithHorses, fetchMember } from './db';

let mockCtx: MockContext;
let ctx: Context;
let date = new Date();

mockCtx = createMockContext();
ctx = mockCtx as unknown as Context;

describe('Prisma query db test', () => {
  test('Create member', async () => {
    const member: Member = {
      firstName: 'Rich',
      lastName: 'Richy',
      fullName: 'Rich Richy',
      memberType: 'SR' as Type,
      memberStatus: 'Lifetime' as Status,
      boardMember: true,
      address: '123 test street',
      city: 'nice city',
      state: 'TX',
      zip: 12345,
      phone: '123-123-1234',
      confirmed: false,
      email: '',
      membershipDate: date,
      JRSR: 'SR',
      comments: '',
      createdAt: date,
      updatedAt: date,
      phoneType: 'Mobile',
      currentUSEAMember: false,
      businessName: null,
      dateOfBirth: null,
      useaMemberID: null,
    };

    mockCtx.prisma.member.create.mockResolvedValue(member);
    await expect(createMember(member, ctx)).resolves.toEqual(member);
  });

  test('Create member with horses', async () => {
    const member: Member = {
      firstName: 'Rich',
      lastName: 'Richy',
      fullName: 'Rich Richy',
      memberType: 'SR' as Type,
      memberStatus: 'Lifetime' as Status,
      boardMember: true,
      address: '123 test street',
      city: 'nice city',
      state: 'TX',
      zip: 12345,
      phone: '123-123-1234',
      confirmed: false,
      email: '',
      membershipDate: date,
      JRSR: 'SR',
      comments: '',
      createdAt: date,
      updatedAt: date,
      phoneType: 'Mobile' as PhoneType,
      currentUSEAMember: false,
      businessName: null,
      dateOfBirth: null,
      useaMemberID: null,
    };

    const horses: Horse[] = [
      {
        createdAt: date,
        updatedAt: date,
        horseRN: 'TacoBell',
        horseAKA: 'bell',
        notConnected: false,
        memberName: 'Rich Richy',
        registrationDate: date,
        regType: 'Life',
        owner: null,
      },
    ];
    const input = { member, horses };

    const res = createMemberWithHorses(input, ctx);
    await expect(res).resolves.toEqual(input);
  });

  test('fetch member by Full name', async () => {
    const member: Member = {
      firstName: 'Rich',
      lastName: 'Richy',
      fullName: 'Rich Richy',
      memberType: 'SR' as Type,
      memberStatus: 'Lifetime' as Status,
      boardMember: true,
      address: '123 test street',
      city: 'nice city',
      state: 'TX',
      zip: 12345,
      phone: '123-123-1234',
      confirmed: false,
      email: '',
      membershipDate: date,
      JRSR: 'SR',
      comments: '',
      createdAt: date,
      updatedAt: date,
      phoneType: 'Mobile',
      currentUSEAMember: false,
      businessName: null,
      dateOfBirth: null,
      useaMemberID: null,
    };
    mockCtx.prisma.member.findFirst.mockResolvedValue(member);

    await expect(fetchMember('Rich Richy', ctx)).resolves.toEqual(member);
  });
});
