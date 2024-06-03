import { subjects } from "@/server/api/routers/subjects";
import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { user } from "./routers/users";
import { verificationTokens } from "./routers/verification-tokens";
import { units } from "./routers/units";
import { practices } from "./routers/practices";
import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";
import { lessons } from "./routers/lessons";
import { questionTypes } from "./routers/question-types";
import { writeQuestions } from "./routers/write-questions";
import { shopItems } from "./routers/shop-items";
import { quests } from "./routers/quests";
import { achievements } from "./routers/achievements";
import { leagues } from "./routers/leagues";

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
  practices,
  lessons,
  questionTypes,
  writeQuestions,
  shopItems,
  quests,
  achievements,
  leagues,
  revalidate: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    revalidatePath(input);
  }),
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
