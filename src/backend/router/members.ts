import { z } from 'zod';

import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { HorseModel, PaymentModel, MemberModel } from '@/backend/prisma/zod';
import { TRPCError } from '@trpc/server';

export const member = createRouter()
  .query('get-members', {
    input: z
      .object({
        memberName: z.string(),
      })
      .optional(),

    async resolve({ input }) {
      let data;

      if (input === undefined) {
        data = await prisma.member
          .findMany()
          .then(members => members)
          .catch(err => console.log('Backend Error:', err));

        return data as Member[];
      } else {
        data = await prisma.member
          .findFirst({
            where: {
              fullName: input.memberName,
            },
          })
          .then(members => members)
          .catch(err => console.log('Backend Error:', err));

        return data as Member;
      }
    },
  })
  .query('applicants', {
    async resolve() {
      return await prisma.member
        .findMany({ where: { confirmed: false } })
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
      member: MemberModel.required(),
      payment: PaymentModel.omit({ payee: true }).optional(),
      horses: HorseModel.array().optional(),
    }),

    async resolve({ input }) {
      await prisma.member
        .create({
          data: {
            ...input.member,
            payment: {
              create: {
                ...input.payment,
              },
            },
          },
        })
        .catch(err => console.log('ERROR', err));

      if (input.horses) {
        for (let horse of input.horses) {
          const date = new Date();
          await prisma.horse.create({
            data: {
              ...horse,
              registrationDate: date,
              memberName: input.member.fullName,
            },
          });
        }
      }
    },
  })
  .mutation('update-member', {
    input: MemberModel.deepPartial(),
    async resolve({ input: { fullName, ...others } }) {
      return await prisma.member
        .update({
          where: {
            fullName: fullName,
          },
          data: {
            ...others,
          },
        })
    },
  });
