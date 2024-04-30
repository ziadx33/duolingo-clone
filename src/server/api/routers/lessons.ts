import { getLessonsByPracticeIds } from "@/server/actions/lessons";
import { getPracticesByUnitId } from "@/server/actions/practices";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const lessons = createTRPCRouter({
  getLessonsByPracticeId: publicProcedure
    .input(
      z.object({
        practiceId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { practiceId } = input;
      const lessons = await getPracticesByUnitId(practiceId);
      return lessons;
    }),
  getLessonsByPracticeIds: publicProcedure
    .input(
      z.object({
        practiceIds: z.string().array(),
      }),
    )
    .query(async ({ input }) => {
      const { practiceIds } = input;
      const lessons = await getLessonsByPracticeIds(practiceIds);
      return lessons;
    }),
});
