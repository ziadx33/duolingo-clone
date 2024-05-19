import { unstable_cache } from "next/cache";
import prisma from "../db/prisma";

export const getChoosingQuestionByQuestionTypeId = unstable_cache(
  async (questionTypeId: string) => {
    try {
      const choosingQuestion = await prisma.questionType
        .findUnique({
          where: {
            id: questionTypeId,
          },
        })
        .choosingQuestion();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return choosingQuestion;
    } catch (err) {
      throw err;
    }
  },
  ["hearing-question", "id"],
);
