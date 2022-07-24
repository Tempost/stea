import { transformer } from '@/utils/trpc';
import { family } from './familymember';
import { horse } from './horses';
import { member } from './members';
import { ranking } from './ranking';
import { show } from './shows';
import { nonMemberHorseOwner } from './nonmemberhorseowner';
import { createRouter } from './utils';

export const appRouter = createRouter()
  .transformer(transformer)
  .merge('member.', member)
  .merge('nonMemberHorseOwner.', nonMemberHorseOwner)
  .merge('horse.', horse)
  .merge('ranking.', ranking)
  .merge('family.', family)
  .merge('shows.', show);

export type AppRouter = typeof appRouter;
