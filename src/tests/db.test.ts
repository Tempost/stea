import { FamilyMember, Member } from '@prisma/client';
import { MockContext, Context, createMockContext } from './context'
import { createFamilyMember, createMember, fetchMember} from './db'

let mockCtx: MockContext
let ctx: Context
let date = new Date();

mockCtx = createMockContext()
ctx = mockCtx as unknown as Context

test('Create member', async () => {

  const member: Member = {
    uid: 1,
    name: 'Rich',
    memberType: 'SR',
    memberStatus: 'Lifetime',
    boardMember: true,
    address: '123 test street',
    city: 'nice city',
    state: 'TX',
    zip: 12345,
    phone: '123-123-1234',
    previousMember: true,
    riderLevel: 'max',
    confirmed: false,
    rankingId: null,
    createdAt: date,
    updatedAt: date,
  }

  mockCtx.prisma.member.create.mockResolvedValue(member);
  await expect(createMember(member, ctx)).resolves.toEqual(member);

});

test('Create family', async () => {
  const familyMember: FamilyMember = {
    uid: 1,
    createdAt: date,
    updatedAt: date,
    name: 'Bob Joe',
    email: 'email@gmail.com',
    riderLevel: 'jr',
    memberId: 1
  }

  mockCtx.prisma.familyMember.create.mockResolvedValue(familyMember);

  await expect(createFamilyMember(familyMember, ctx)).resolves.toEqual(familyMember);
});

test('fetch member by family', async () => {
  const member: Member = {
    uid: 1,
    name: 'Rich',
    memberType: 'SR',
    memberStatus: 'Lifetime',
    boardMember: true,
    address: '123 test street',
    city: 'nice city',
    state: 'TX',
    zip: 12345,
    phone: '123-123-1234',
    previousMember: true,
    riderLevel: 'max',
    confirmed: false,
    rankingId: null,
    createdAt: date,
    updatedAt: date,
  }
  mockCtx.prisma.member.findFirst.mockResolvedValue(member);

  await expect(fetchMember(1, ctx)).resolves.toEqual(member);
});
