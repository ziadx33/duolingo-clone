import { getQuestionTypesByLessonId } from "@/server/actions/question-types";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const questionTypes = createTRPCRouter({
  getQuestionTypesByLessonId: publicProcedure
    .input(z.object({ lessonId: z.string() }))
    .query(async ({ input }) => {
      const { lessonId } = input;
      const lessons = await getQuestionTypesByLessonId(lessonId);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return lessons;
    }),
});
