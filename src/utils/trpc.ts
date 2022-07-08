import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@/backend/router";
import superjson from 'superjson';

export const trpc = createReactQueryHooks<AppRouter>();
export const transformer = superjson;
