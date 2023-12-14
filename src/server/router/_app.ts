import { router } from '@/server/trpc';
import { horses } from './horses';
import { members } from './members';
import { shows } from './shows';
import { riders } from './combos';
import { mail } from './mail';
import { nonMemberHorseOwners } from './nonmemberhorseowners';
import { boardmember } from './boardmember';

export const appRouter = router({
  boardmember,
  members,
  nonMemberHorseOwners,
  horses,
  shows,
  riders,
  mail,
});

export type AppRouter = typeof appRouter;
