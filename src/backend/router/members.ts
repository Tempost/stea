import { z } from 'zod';

import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { PaymentModel, MemberModel } from '@/backend/prisma/zod';
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
      payment: PaymentModel.omit({ payee: true }).optional(),
      horses: z
        .object({
          horseRN: z.string(),
          horseAKA: z.string().optional(),
          regType: z.nativeEnum(Status),
        })
        .array()
        .optional(),
      division: z.string(),
    }),

    async resolve({ input: { member, payment, horses, division } }) {
      const riderCombo = horses
        ? horses.map(horse => {
            return {
              horseName: horse.horseRN,
              division: division,
            };
          })
        : [];

      return await prisma.member.create({
        data: {
          ...member,
          fullName: `${member.firstName} ${member.lastName}`,
          payment: {
            create: {
              ...payment,
            },
          },
          Horse: {
            create: horses && [...horses],
          },
          RiderCombo: {
            create: [...riderCombo],
          },
        },
        select: {
          Horse: true,
          RiderCombo: true,
          payment: true,
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
