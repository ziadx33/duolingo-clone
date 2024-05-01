/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
"use server";

import {
  type ListeningQuestion,
  type QuestionType,
  type SelectCorrectVoiceQuestion,
  type WriteQuestion,
  type Lesson,
} from "@prisma/client";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "../db/prisma";
import { getWriteQuestionByQuestionTypeId } from "./write-questions";

export const getQuestionTypesByLessonId = unstable_cache(
  cache(async (lessonId: Lesson["id"]) => {
    try {
      const questionTypes = await prisma.lesson
        .findUnique({
          where: {
            id: lessonId,
          },
        })
        .questions();

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return questionTypes;
    } catch (err) {
      throw err;
    }
  }),
  ["question-types", "id"],
);

export const getQuestionByQuestionType = unstable_cache(
  cache(async (questionType: Partial<QuestionType>) => {
    try {
      let question:
        | WriteQuestion
        | ListeningQuestion
        | SelectCorrectVoiceQuestion
        | null = null;
      if (questionType.writeId) {
        const writeQuestion = await getWriteQuestionByQuestionTypeId(
          questionType.id!,
        );
        question = writeQuestion;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return questionType.type === "LISTENING"
        ? (question as ListeningQuestion)
        : questionType.type === "SELECT_CORRECT_VOICE"
          ? (question as SelectCorrectVoiceQuestion)
          : (question as WriteQuestion);
    } catch (err) {
      throw err;
    }
  }),
  ["question", "id"],
);
