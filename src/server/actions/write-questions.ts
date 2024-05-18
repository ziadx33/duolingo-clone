import { unstable_cache } from "next/cache";
import prisma from "../db/prisma";
import { type WriteQuestionAnswer } from "@prisma/client";

export const getWriteQuestionByQuestionTypeId = unstable_cache(
  async (questionTypeId: string) => {
    try {
      const writeQuestion = await prisma.questionType
        .findUnique({
          where: {
            id: questionTypeId,
          },
        })
        .WriteQuestion();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return writeQuestion;
    } catch (err) {
      throw err;
    }
  },
  ["write-question", "id"],
);

export const getWriteQuestionAnswer = unstable_cache(
  async (writeQuestionAnswerId: WriteQuestionAnswer["id"]) => {
    try {
      const writeQuestionAnswer = await prisma.writeQuestionAnswer.findUnique({
        where: {
          id: writeQuestionAnswerId,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return writeQuestionAnswer;
    } catch (err) {
      throw err;
    }
  },
  ["write-question-answer", "id"],
);
