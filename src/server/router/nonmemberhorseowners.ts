import { z } from 'zod';

import { MyPrismaClient } from '@/server/prisma';
import { NonMemberHorseOwnerPartialSchema } from '@/server/prisma/zod-generated/modelSchema/NonMemberHorseOwnerSchema';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';
import { dashboardProcedure, procedure, router } from '@/server/trpc';
import { OwnerHorseForm, OwnerHorseFormSchema } from '@/utils/zodschemas';
import { NonMemberHorseOwnerFindManyArgsSchema } from '../prisma/zod-generated';

export const nonMemberHorseOwners = router({
  all: procedure
    .input(NonMemberHorseOwnerFindManyArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.nonMemberHorseOwner.findMany(input);
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
    .input(OwnerHorseFormSchema)
    .mutation(async ({ input: { horses, owner }, ctx }) => {
      const existingMember = await ctx.prisma.member.findUnique({
        where: { fullName: `${owner.firstName} ${owner.lastName}` },
      });

      if (existingMember !== null) {
        // Existing member, update their horses instead
        console.log(
          `Member exists adding horses to ${owner.firstName} ${owner.lastName}...`
        );

        // TODO: Horse already exists, how to update only its info
        try {
          return await ctx.prisma.member.update({
            where: { fullName: `${owner.firstName} ${owner.lastName}` },
            data: {
              Horse: {
                upsert: horses.map(horse => {
                  return {
                    where: { horseRN: horse.horseRN },
                    create: { ...horse },
                    update: { ...horse },
                  };
                }),
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
        patch: NonMemberHorseOwnerPartialSchema,
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
  { horses, owner }: OwnerHorseForm,
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
