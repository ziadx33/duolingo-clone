import { unstable_cache } from "next/cache";
import prisma from "../db/prisma";

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
