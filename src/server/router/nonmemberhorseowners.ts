import { z } from 'zod';

import { MyPrismaClient } from '@/server/prisma';
import { HorseModel, NonMemberHorseOwnerModel } from '@/server/prisma/zod';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';
import { dashboardProcedure, procedure, router } from '@/server/trpc';

const AddOwnerInput = z.object({
  owner: NonMemberHorseOwnerModel.omit({ fullName: true }),
  horses: z.array(HorseModel),
});
type AddOwnerInput = z.infer<typeof AddOwnerInput>;

export const nonMemberHorseOwners = router({
  all: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.nonMemberHorseOwner.findMany();
  }),

  get: procedure
    .input(z.object({ ownerName: z.string() }))
    .query(async ({ input, ctx }) => {
      const { ownerName } = input;
      const owner = await ctx.prisma.nonMemberHorseOwner.findUnique({
        where: { fullName: ownerName },
      });

      if (!owner) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${ownerName} not found.`,
        });
      }

      return owner;
    }),

  add: procedure
    .input(AddOwnerInput)
    .mutation(async ({ input: { owner, horses }, ctx }) => {
      const existingMember = await ctx.prisma.member.findUnique({
        where: { fullName: `${owner.firstName} ${owner.lastName}` },
      });

      if (existingMember !== null) {
        // Existing member, update their horses instead
        console.log(
          `Member exists adding horses to ${owner.firstName} ${owner.lastName}...`
        );

        try {
          return await ctx.prisma.member.update({
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
              throw new Error(
                'Something went wrong, contact us for more details.'
              );
            }
          }

          throw error;
        }
      } else {
        try {
          // otherwise create/update an owner record
          console.info(
            `Adding new owner ${owner.firstName} ${owner.lastName}...`
          );
          return await upsertOwner({ owner, horses }, ctx.prisma);
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              throw new Error(
                'Something went wrong, contact us for more details.'
              );
            }
          }

          throw error;
        }
      }
    }),

  update: procedure
    .input(
      z.object({
        ownerName: z.string(),
        patch: NonMemberHorseOwnerModel.deepPartial(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.info(`Updating owner ${input.ownerName}...`);

      return await ctx.prisma.nonMemberHorseOwner.update({
        where: {
          fullName: input.ownerName,
        },
        data: {
          ...input.patch,
        },
      });
    }),

  remove: dashboardProcedure
    .input(z.object({ ownerName: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log(`Removing owner ${input.ownerName}`);

      const owner = await ctx.prisma.nonMemberHorseOwner.findUnique({
        where: { fullName: input.ownerName },
      });

      if (!owner) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${input.ownerName} not found.`,
        });
      }

      const deletedOwner = await ctx.prisma.nonMemberHorseOwner.delete({
        where: { fullName: owner.fullName },
      });

      return deletedOwner;
    }),
});

async function upsertOwner(
  { owner, horses }: AddOwnerInput,
  db: MyPrismaClient
) {
  try {
    const newOwner = await db.nonMemberHorseOwner.upsert({
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
