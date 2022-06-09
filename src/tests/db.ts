import { FamilyMember, Member } from '@prisma/client'
import { Context } from './context'

export async function createMember(member: Member, ctx: Context) {
  return await ctx.prisma.member.create({
    data: member,
  })
}

export async function createFamilyMember(familyMember: FamilyMember, ctx: Context) {
  return await ctx.prisma.familyMember.create({
    data: familyMember,
  })
}

export async function fetchMember(memberId: number, ctx: Context) {
  return await ctx.prisma.member.findFirst({
    where: {
      uid: {
        equals: memberId,
      },
    },
  })
}
