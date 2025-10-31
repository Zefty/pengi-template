import "server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { headers } from "next/headers";
import { cache } from "react";

import { appRouter, createCaller } from "~/server/api/trpc/root";
import { createTRPCContext } from "~/server/api/trpc";
import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

/**
 * Server QueryClient that is used for SSR and SSG
 */
export const getQueryClient = cache(createQueryClient);

/**
 * To prefetch queries from server components, we create a proxy from our router.
 * This method ensures that the query client's is populated by the server.
 */
export const trpc = createTRPCOptionsProxy({
  ctx: createContext,
  router: appRouter,
  queryClient: getQueryClient,
});

/**
 * A server caller to access data directly in a server component.
 * This method is detached from the query client, so the data is not stored in the cache.
 */
export const api = createCaller(createContext);
