import { TRPCError } from '@trpc/server';
import { dashboardProcedure, procedure, router } from '@/server/trpc';
import { HorseFormSchema } from '@/utils/zodschemas';
import { HorseFindManyArgsSchema } from '../prisma/zod-generated/outputTypeSchemas/HorseFindManyArgsSchema';
import { HorseWhereUniqueInputSchema } from '../prisma/zod-generated/inputTypeSchemas/HorseWhereUniqueInputSchema';
import { HorseOptionalDefaultsSchema } from '../prisma/zod-generated/modelSchema/HorseSchema';
import { checkExistingHorses, horseNames } from './utils';

export const horses = router({
  all: procedure
    .input(HorseFindManyArgsSchema.optional())
    .query(async ({ input, ctx }) => {
      const horses = await ctx.prisma.horse
        .findMany(input)
        .then(horses => {
          return horses;
        })
        .catch(e => {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to fetch horses.',
            cause: e,
          });
        });

      return horses;
    }),

  get: procedure
    .input(HorseWhereUniqueInputSchema)
    .query(async ({ input, ctx }) => {
      const horse = await ctx.prisma.horse.findUnique({
        where: input,
      });

      if (!horse) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `${input.horseRN} not found.`,
        });
      }

      return horse;
    }),

  add: dashboardProcedure
    .input(HorseOptionalDefaultsSchema)
    .mutation(async ({ input, ctx }) => {
      if (input.memberName !== null) {
        return await ctx.prisma.horse.create({
          data: {
            horseRN: input.horseRN,
            regType: input.regType,
            horseAKA: input.horseAKA,
            memberOwner: {
              connect: {
                fullName: input.memberName,
              },
            },
          },
        });
      }

      if (input.owner !== null) {
        return await ctx.prisma.horse.create({
          data: {
            horseRN: input.horseRN,
            regType: input.regType,
            horseAKA: input.horseAKA,
            ownerRec: {
              connect: {
                fullName: input.owner,
              },
            },
          },
        });
      }

      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Unable to add new horse.',
      });
    }),

  exists: procedure.input(HorseFormSchema).mutation(async ({ input, ctx }) => {
    console.log(`Checking for horses... ${horseNames(input)}`);
    const existingHorses = await checkExistingHorses(input, ctx.prisma);

    if (existingHorses) {
      const signedUp: typeof existingHorses | undefined = [];
      existingHorses.forEach(horse => {
        if (horse.regType === 'Life') signedUp.push(horse);
        if (horse.registrationEnd) {
          const horseInput = input.find(h => h.horseRN === horse.horseRN);
          if (horseInput && horseInput.registrationEnd) {
            if (horse.registrationEnd >= horseInput.registrationEnd) {
              signedUp.push(horse);
            }
          }
        }
      });

      if (signedUp.length > 0) {
        const message = `${horseNames(signedUp)}
        ${signedUp.length > 1 ? 'have' : 'has'} already been registered.`;

        throw new TRPCError({
          code: 'CONFLICT',
          message: message,
        });
      }
    }
  }),
});
