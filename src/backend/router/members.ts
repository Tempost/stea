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
      return await prisma.member.findMany().catch(error => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch member list',
            cause: error,
          });
        } else {
          throw error;
        }
      });
    },
  })
  .query('get-member', {
    input: z.object({
      fullName: z.string(),
    }),
    async resolve({ input }) {
      const { fullName } = input;
      return await prisma.member
        .findUniqueOrThrow({ where: { fullName } })
        .catch(error => {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2001') {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: `${fullName} not found.`,
                cause: error,
              });
            } else {
              throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: `Something went wrong fetching ${fullName}`,
                cause: error,
              });
            }
          } else {
            throw error;
          }
        });
    },
  })
  .query('applicants', {
    async resolve() {
      return await prisma.member.findMany({ where: { confirmed: false } });
    },
  })
  .mutation('exists', {
    input: MemberFormValues,
    async resolve({ input }) {
      const fullName =
        input.member.businessName ??
        `${input.member.firstName} ${input.member.lastName}`;

      console.info(`Checking for ${fullName}...`);

      if (await checkForExistingMember(fullName)) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `${fullName} is already a member`,
        });
      }
    },
  })
  .mutation('add-member', {
    input: MemberFormValues,

    async resolve({ input: { member, horses } }) {
      console.info('Member: ', member);
      console.info('Horses: ', horses ?? 'Did not register horses');

      try {
        await prisma.member.create({
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
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Something went wrong, contact us for more information.',
            cause: error,
          });
        }

        throw error;
      }
    },
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.token) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .mutation('remove-member', {
    input: z.object({ fullName: z.string() }),
    async resolve({ input }) {
      const { fullName } = input;

      console.info(`Removing member ${fullName}...`);

      try {
        const member = await prisma.member.findUniqueOrThrow({
          where: { fullName },
        });

        const deletedMember = await prisma.member.delete({
          where: { fullName: member.fullName },
        });

        return deletedMember;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `${fullName} not found.`,
              cause: error,
            });
          } else {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: `unable to remove ${fullName}`,
              cause: error,
            });
          }
        }
      }
    },
  })
  .mutation('update-member', {
    input: MemberModel.deepPartial(),
    async resolve({ input: { fullName, ...patch } }) {
      console.info(`Updating member.. ${fullName} ${patch}`);

      try {
        return await prisma.member.update({
          where: {
            fullName: fullName,
          },
          data: {
            ...patch,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2001') {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: `${fullName} not found.`,
              cause: error,
            });
          } else {
            throw new TRPCError({
              code: 'INTERNAL_SERVER_ERROR',
              message: 'Something went wrong, contact us for more information.',
              cause: error,
            });
          }
        }

        throw error;
      }
    },
  });

async function checkForExistingMember(fullName: string) {
  const member = await prisma.member.findUnique({ where: { fullName } });

  if (member) return true;

  return false;
}
