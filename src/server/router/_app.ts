import { router } from '@/server/trpc';
import { horses } from './horses';
import { members } from './members';
import { points } from './points';
import { shows } from './shows';
import { riders } from './combos';
import { nonMemberHorseOwners } from './nonmemberhorseowners';

export const appRouter = router({
  members,
  nonMemberHorseOwners,
  horses,
  points,
  shows,
  riders,
});

export type AppRouter = typeof appRouter;
