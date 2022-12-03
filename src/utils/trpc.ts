import { createReactQueryHooks } from '@trpc/react';
import superjson from 'superjson';

import type { inferProcedureInput, inferProcedureOutput } from '@trpc/server';
import type { AppRouter } from '@/backend/router/_app';

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/react#3-create-trpc-hooks
 */
export const trpc = createReactQueryHooks<AppRouter>();
export const transformer = superjson;

/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type AppQueries = AppRouter['_def']['queries'];
export type TQuery = keyof AppQueries;
export type inferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppQueries[TRouteKey]
>;

export type inferQueryInput<TRouteKey extends TQuery> = inferProcedureInput<
  AppQueries[TRouteKey]
>;

export type AppMutations = AppRouter['_def']['mutations'];
export type TMutation = keyof AppMutations;

export type inferMutationOutput<TRouteKey extends TMutation> =
  inferProcedureOutput<AppMutations[TRouteKey]>;

export type inferMutationInput<TRouteKey extends TMutation> =
  inferProcedureInput<AppMutations[TRouteKey]>;
