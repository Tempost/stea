import { createReactQueryHooks } from '@trpc/react';
import superjson from 'superjson';

import type { AppRouter } from '@/backend/router';

export const trpc = createReactQueryHooks<AppRouter>();
export const transformer = superjson;
