import { nanoid } from 'nanoid';
import { Member } from '@prisma/client';
import { MockContext, Context, createMockContext } from './context'
import { createMember } from './db'

let mockCtx: MockContext
let ctx: Context
let date = new Date();

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

test('should create new member ', async () => {
  const member: Member = {
    uid: 2,
    createdAt: date,
    updatedAt: date,
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
    rankingId: null
  }
  mockCtx.prisma.member.create.mockResolvedValue(member)

  await expect(createMember(member, ctx)).resolves.toEqual({
    uid: 2,
    createdAt: date,
    updatedAt: date,
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
    rankingId: null
  })
})
