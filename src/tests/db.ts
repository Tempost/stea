import { Member } from '@prisma/client'
import { Context } from './context'

export async function createMember(member: Member, ctx: Context) {
  return await ctx.prisma.member.create({
      data: member,
    })
}
