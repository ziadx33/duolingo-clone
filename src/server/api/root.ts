import { subjects } from "@/server/api/routers/subjects";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { user } from "./routers/users";
import { verificationTokens } from "./routers/verification-tokens";
import { units } from "./routers/units";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  subjects,
  auth: {
    user,
    verificationTokens,
  },
  units,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
