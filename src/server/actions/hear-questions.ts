import { unstable_cache } from "next/cache";
import prisma from "../db/prisma";

export const getHearingQuestionByQuestionId = unstable_cache(
  async (questionTypeId: string) => {
    try {
      const hearingQuestion = await prisma.questionType
        .findUnique({
          where: {
            id: questionTypeId,
          },
        })
        .hearingQuestion();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return hearingQuestion;
    } catch (err) {
      throw err;
    }
  },
  ["hearing-question", "id"],
);
