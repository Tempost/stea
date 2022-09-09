import { Horse, Member } from '@prisma/client';
import { Context } from './context';

export async function createMember(member: Member, ctx: Context) {
  return await ctx.prisma.member.create({
    data: member,
  });
}

export async function fetchMember(name: string, ctx: Context) {
  return await ctx.prisma.member.findFirst({
    where: {
      fullName: {
        equals: name,
      },
    },
  });
}

export async function createMemberWithHorses(
  input: {
    member: Member;
    horses: Horse[];
  },
  ctx: Context
) {
  const member = await ctx.prisma.member.create({
    data: input.member,
  });

  let horses: Horse[] = [];
  for (let horse of input.horses) {
    const horseRes = await ctx.prisma.horse.create({
      data: {
        ...horse,
        memberName: input.member.fullName,
      },
    });
    horses.push(horseRes);
  }
  return { member, horses };
}
