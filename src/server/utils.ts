import fs from 'fs';
import { z } from 'zod';
import { ShowTypeSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/ShowTypeSchema';
import { DivisionSchema } from '@/server/prisma/zod-generated/inputTypeSchemas/DivisionSchema';
import { HorseForm } from '@/utils/zodschemas';
import { Horse } from '@prisma/client';

export const CSVEntrySchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  horseName: z.string().trim(),
  rideType: ShowTypeSchema,
  division: DivisionSchema,
  group: z.enum(['A', 'B', 'C', 'D']),
  finalScore: z.coerce.number(),
  placing: z.preprocess(
    val => String(val).replaceAll(',', ''),
    z.enum([
      'HC',
      'R',
      'C',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      'W',
      'E',
      'RF',
      'TE',
    ]),
  ),
});
export type CSVEntry = z.infer<typeof CSVEntrySchema>;

export const mapping = {
  President: 'President',
  Secretary: 'Secretary',
  Treasurer: 'Treasurer',
  AwardsCoordinator: 'Awards Coordinator',
  Points: 'Points',
  AdultMemberAtLarge: 'Adult Member At Large',
  JuniorMemberAtLarge: 'Junior Member At Large',
  SocialMediaManager: 'Social Media Manager',
  VicePresident: 'Vice President',
};
// Get Keys and assert correct key types instead of just string

export const getKeys = Object.keys as <T extends object>(
  obj: T,
) => Array<keyof T>;
export const horseNames = (horses: HorseForm | Array<Horse>) =>
  horses.map(horse => horse.horseRN);
export function groupByFunc<
  RetType extends PropertyKey,
  TObj,
  Func extends (arg: TObj) => RetType,
>(arr: Array<TObj>, mapper: Func): Record<RetType, Array<TObj>> {
  return arr.reduce(
    (accumulator, val) => {
      const groupedKey = mapper(val);
      if (!accumulator[groupedKey]) {
        accumulator[groupedKey] = [];
      }
      accumulator[groupedKey].push(val);
      return accumulator;
    },
    {} as Record<RetType, Array<TObj>>,
  );
}

/**
 * Took this syntax from https://github.com/MattMorgis/async-stream-generator
 * Didn't find proper documentation: how come you can iterate on a Node.js ReadableStream via "of" operator?
 * What's "for await"?
 */
export async function* nodeStreamToIterator(stream: fs.ReadStream) {
  for await (const chunk of stream) {
    yield chunk;
  }
}

/**
 * Taken from Next.js doc
 * https://nextjs.org/docs/app/building-your-application/routing/router-handlers#streaming
 * Itself taken from mozilla doc
 * https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
 */
// @ts-expect-error acceptable use of any
export function iteratorToStream(iterator): ReadableStream {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        // conversion to Uint8Array is important here otherwise the stream is not readable
        // @see https://github.com/vercel/next.js/issues/38736
        controller.enqueue(new Uint8Array(value));
      }
    },
  });
}
