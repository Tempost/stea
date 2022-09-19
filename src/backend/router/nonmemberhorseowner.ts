import { z } from 'zod';

import { createRouter, prepareCombos } from './utils';
import { prisma } from '@/backend/prisma';
import { Prisma } from '@prisma/client';
import { HorseModel, NonMemberHorseOwnerModel } from '@/backend/prisma/zod';
import { TRPCError } from '@trpc/server';

const addOwnerInput = z.object({
  owner: NonMemberHorseOwnerModel,
  horses: z.array(HorseModel),
  combos: z
    .array(
      z.object({
        memberName: z.string(),
        horseName: z.string(),
        division: z.string(),
      })
    )
    .optional(),
});
type AddOwnerInput = z.infer<typeof addOwnerInput>;

export const nonMemberHorseOwner = createRouter()
  .query('get-owners', {
    async resolve() {
      const data = await prisma.nonMemberHorseOwner.findMany();

      return data;
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
    async resolve({ input }) {
      const existingMember = await prisma.member.findUnique({
        where: { fullName: input.owner.fullName },
      });

      if (existingMember !== null) {
        // Existing member, update their horse/rider combos instead
        return await prisma.member.update({
          where: { fullName: input.owner.fullName },
          data: {
            RiderCombo: {
              create: [...prepareCombos(input.combos)],
            },
            Horse: {
              create: [...input.horses],
            },
          },
        });
      } else {
        // otherwise create/update an owner record
        return await upsertOwner(input);
      }
    },
  });

async function upsertOwner({ owner, horses, combos }: AddOwnerInput) {
  const newOwner = await prisma.nonMemberHorseOwner.upsert({
    where: { fullName: owner.fullName },
    create: {
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

  // Create and connect any provided rider combos
  if (combos) {
    for (let combo of combos) {
      await prisma.riderCombo.create({
        data: {
          division: combo.division,
          horse: {
            connect: {
              horseRN: combo.horseName,
            },
          },
          member: {
            connect: {
              fullName: combo.memberName,
            },
          },
        },
      });
    }
  }
  return newOwner;
}
