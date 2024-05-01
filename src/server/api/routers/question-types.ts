import {
  getQuestionByQuestionType,
  getQuestionTypesByLessonId,
} from "@/server/actions/question-types";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { QuestionTypeModel } from "prisma/zod";
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
  getQuestionByQuestionType: publicProcedure
    .input(
      z.object({
        questionType: QuestionTypeModel,
      }),
    )
    .query(async ({ input }) => {
      const { questionType } = input;
      const question = await getQuestionByQuestionType(questionType);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return question;
    }),
});
