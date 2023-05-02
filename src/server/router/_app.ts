import { router } from '@/server/trpc';
import { horses } from './horses';
import { members } from './members';
import { shows } from './shows';
import { riders } from './combos';
import { mail } from './mail';
import { nonMemberHorseOwners } from './nonmemberhorseowners';

export const appRouter = router({
  members,
  nonMemberHorseOwners,
  horses,
  shows,
  riders,
  mail,
});

export type AppRouter = typeof appRouter;
