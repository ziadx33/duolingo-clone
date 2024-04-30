"use server";

import { type Lesson } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "../db/prisma";

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
