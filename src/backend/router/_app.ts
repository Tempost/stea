import { transformer } from '@/utils/trpc';
import { horse } from './horses';
import { member } from './members';
import { points } from './points';
import { show } from './shows';
import { nonMemberHorseOwner } from './nonmemberhorseowner';
import { createRouter } from './utils';

export const appRouter = createRouter()
  .transformer(transformer)
  .merge('member.', member)
  .merge('nonMemberHorseOwner.', nonMemberHorseOwner)
  .merge('horse.', horse)
  .merge('ranking.', points)
  .merge('shows.', show);

export type AppRouter = typeof appRouter;
