import { z } from 'zod';

import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { MemberModel } from '@/backend/prisma/zod';
import { TRPCError } from '@trpc/server';
import { MemberFormValues } from '@/utils/zodschemas';
import { Prisma } from '@prisma/client';

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
          cause: 'Tried to remove non-existing member',
        });
      }

      const deletedMember = await prisma.member.delete({
        where: { fullName: member.fullName },
      });

      return deletedMember;
    },
  })
  .mutation('add-member', {
    input: MemberFormValues,

    async resolve({ input: { member, horses } }) {
      console.log(member);
      try {
        const res = await prisma.member.create({
          data: {
            ...member,
            fullName:
              member.businessName ?? `${member.firstName} ${member.lastName}`,
            Horse: {
              create: horses && [...horses],
            },
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new TRPCError({
              code: 'CONFLICT',
              message: 'Something went wrong, contact us for more information.',
              cause: error,
            });
          }
        }

        throw error;
      }
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
