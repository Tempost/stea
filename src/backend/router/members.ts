import { z } from 'zod';

import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { MemberModel } from '@/backend/prisma/zod';
import { TRPCError } from '@trpc/server';
import { Status } from '@prisma/client';

export const member = createRouter()
  .query('get-members', {
    async resolve() {
      return await prisma.member.findMany();
    },
  })
  .query('get-member', {
    input: z.object({
      fullName: z.string(),
    }),
    async resolve({ input }) {
      const { fullName } = input;
      const member = await prisma.member.findUnique({ where: { fullName } });

      if (!member) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${fullName} not found.`,
        });
      }

      return member;
    },
  })
  .query('applicants', {
    async resolve() {
      return await prisma.member.findMany({ where: { confirmed: false } });
    },
  })
  .mutation('remove-member', {
    input: z.object({ fullName: z.string() }),
    async resolve({ input }) {
      const { fullName } = input;

      const member = await prisma.member.findUnique({
        where: { fullName },
      });

      if (!member) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${fullName} not found.`,
        });
      }

      const deletedMember = await prisma.member.delete({
        where: { fullName: member.fullName },
      });

      return deletedMember;
    },
  })
  .mutation('add-member', {
    input: z.object({
      member: MemberModel.omit({
        fullName: true,
        boardMember: true,
        confirmed: true,
      }).required(),
      horses: z
        .object({
          horseRN: z.string(),
          horseAKA: z.string().optional(),
          regType: z.nativeEnum(Status),
        })
        .array()
        .optional(),
    }),

    async resolve({ input: { member, horses } }) {
      return await prisma.member.create({
        data: {
          ...member,
          fullName: `${member.firstName} ${member.lastName}`,
          Horse: {
            create: horses && [...horses],
          },
        },
      });
    },
  })
  .mutation('update-member', {
    input: MemberModel.deepPartial(),
    async resolve({ input: { fullName, ...others } }) {
      return await prisma.member.update({
        where: {
          fullName: fullName,
        },
        data: {
          ...others,
        },
      });
    },
  });
