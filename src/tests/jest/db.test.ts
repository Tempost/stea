import { FamilyMember, Member, Status, Type } from '@prisma/client';
import { MockContext, Context, createMockContext } from './context';
import { createFamilyMember, createMember, fetchMember } from './db';
import { expect } from '@jest/globals';

let mockCtx: MockContext
let ctx: Context
let date = new Date();

mockCtx = createMockContext()
ctx = mockCtx as unknown as Context

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
      previousMember: true,
      confirmed: false,
      email: null,
      membershipDate: date,
      JRSR: 'SR',
      comments: '',
      createdAt: date,
      updatedAt: date
  }

  mockCtx.prisma.member.create.mockResolvedValue(member);
  await expect(createMember(member, ctx)).resolves.toEqual(member);

});

test('Create family', async () => {
  const familyMember: FamilyMember = {
      name: 'Bob Joe',
      email: 'email@gmail.com',
      JRSR: 'SR',
      notConnected: false,
      uid: '',
      createdAt: null,
      updatedAt: null,
      memberName: ''
  }

  mockCtx.prisma.familyMember.create.mockResolvedValue(familyMember);

  await expect(createFamilyMember(familyMember, ctx)).resolves.toEqual(familyMember);
});

test('fetch member by family', async () => {
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
      previousMember: true,
      confirmed: false,
      email: null,
      membershipDate: date,
      JRSR: 'SR',
      comments: '',
      createdAt: date,
      updatedAt: date
  }
  mockCtx.prisma.member.findFirst.mockResolvedValue(member);

  await expect(fetchMember('Rich Richy', ctx)).resolves.toEqual(member);
});
