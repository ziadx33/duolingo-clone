import {
  getWriteQuestionAnswer,
  getWriteQuestionByQuestionTypeId,
} from "@/server/actions/write-questions";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const writeQuestions = createTRPCRouter({
  getWriteQuestionByQuestionTypeId: publicProcedure
    .input(z.object({ questionType: z.string() }))
    .query(async ({ input }) => {
      const { questionType } = input;
      const questions = await getWriteQuestionByQuestionTypeId(questionType);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return questions;
    }),
  getWriteQuestionAnswer: publicProcedure
    .input(z.object({ writeQuestionAnswerId: z.string() }))
    .query(async ({ input }) => {
      const { writeQuestionAnswerId } = input;
      const questions = await getWriteQuestionAnswer(writeQuestionAnswerId);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return questions;
    }),
});
