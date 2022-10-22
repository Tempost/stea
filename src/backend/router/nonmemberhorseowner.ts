import { z } from 'zod';

import { createRouter } from './utils';
import { prisma } from '@/backend/prisma';
import { HorseModel, NonMemberHorseOwnerModel } from '@/backend/prisma/zod';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';

const addOwnerInput = z.object({
  owner: NonMemberHorseOwnerModel.omit({ fullName: true }),
  horses: z.array(HorseModel),
});
type AddOwnerInput = z.infer<typeof addOwnerInput>;

export const nonMemberHorseOwner = createRouter()
  .query('get-owners', {
    async resolve() {
      return await prisma.nonMemberHorseOwner.findMany();
    },
  })
  .query('get-owner', {
    input: z.object({ ownerName: z.string() }),
    async resolve({ input }) {
      const { ownerName } = input;
      const owner = await prisma.nonMemberHorseOwner.findUnique({
        where: { fullName: ownerName },
      });

      if (!owner) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${ownerName} not found.`,
        });
      }

      return owner;
    },
  })
  .mutation('update-owner', {
    input: z.object({
      ownerName: z.string(),
      patch: NonMemberHorseOwnerModel.deepPartial(),
    }),
    async resolve({ input }) {
      return await prisma.nonMemberHorseOwner.update({
        where: {
          fullName: input.ownerName,
        },
        data: {
          ...input.patch,
        },
      });
    },
  })
  .mutation('remove-owner', {
    input: z.object({ ownerName: z.string() }),
    async resolve({ input }) {
      const { ownerName } = input;

      const owner = await prisma.nonMemberHorseOwner.findUnique({
        where: { fullName: ownerName },
      });

      if (!owner) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${ownerName} not found.`,
        });
      }

      const deletedOwner = await prisma.nonMemberHorseOwner.delete({
        where: { fullName: owner.fullName },
      });

      return deletedOwner;
    },
  })
  .mutation('add-owner-horse', {
    input: addOwnerInput,
    async resolve({ input: { owner, horses } }) {
      const existingMember = await prisma.member.findUnique({
        where: { fullName: `${owner.firstName} ${owner.lastName}` },
      });

      if (existingMember !== null) {
        // Existing member, update their horses instead
        try {
          return await prisma.member.update({
            where: { fullName: `${owner.firstName} ${owner.lastName}` },
            data: {
              Horse: {
                create: [...horses],
              },
            },
          });
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              throw new Error('Something went wrong, contact us for more details.');
            }
          }

          throw error;
        }
      } else {
        try {
          // otherwise create/update an owner record
          return await upsertOwner({ owner, horses });
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              throw new Error('Something went wrong, contact us for more details.');
            }
          }

          throw error;
        }
      }
    },
  });

async function upsertOwner({ owner, horses }: AddOwnerInput) {
  try {
    const newOwner = await prisma.nonMemberHorseOwner.upsert({
      where: { fullName: `${owner.firstName} ${owner.lastName}` },
      create: {
        fullName: `${owner.firstName} ${owner.lastName}`,
        ...owner,
        horses: {
          createMany: {
            data: [...horses],
          },
        },
      },
      update: {
        horses: {
          createMany: {
            data: [...horses],
          },
        },
      },
    });
    return newOwner;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Something went wrong, contact us for more details.');
      }
    }

    throw error;
  }

}
