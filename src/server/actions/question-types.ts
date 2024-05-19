/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
"use server";

import {
  type QuestionType,
  type WriteQuestion,
  type Lesson,
  type HearingQuestion,
  type ChoosingQuestion,
} from "@prisma/client";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "../db/prisma";
import { getWriteQuestionByQuestionTypeId } from "./write-questions";
import { getHearingQuestionByQuestionTypeId } from "./hear-questions";
import { getChoosingQuestionByQuestionTypeId } from "./choose-questions";

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

export const getQuestionByQuestionType = async (
  questionType: Partial<QuestionType>,
) => {
  try {
    let question: WriteQuestion | HearingQuestion | ChoosingQuestion | null =
      null;
    if (questionType.writeId) {
      const writeQuestion = await getWriteQuestionByQuestionTypeId(
        questionType.id!,
      );
      question = writeQuestion;
    }
    if (questionType.hearingId) {
      const hearingQuestion = await getHearingQuestionByQuestionTypeId(
        questionType.id!,
      );
      question = hearingQuestion;
    }
    if (questionType.choosingId) {
      const choosingQuestion = await getChoosingQuestionByQuestionTypeId(
        questionType.id!,
      );
      question = choosingQuestion;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return questionType.type === "HEARING"
      ? (question as HearingQuestion)
      : questionType.type === "CHOOSE"
        ? (question as ChoosingQuestion)
        : (question as WriteQuestion);
  } catch (err) {
    throw err;
  }
};
