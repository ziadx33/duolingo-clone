"use server";

import { type Practice, type Unit } from "@prisma/client";
import { unstable_cache } from "next/cache";
import prisma from "../db/prisma";
import { cache } from "react";

export const getLessonsByPracticeId = unstable_cache(
  cache(async (practiceId: Unit["id"]) => {
    try {
      const lessons = await prisma.practice
        .findUnique({
          where: {
            id: practiceId,
          },
        })
        .lessons();
      return lessons;
    } catch (err) {
      throw err;
    }
  }),
);

export const getLessonsByPracticeIds = unstable_cache(
  cache(async (practiceIds: Practice["id"][]) => {
    try {
      const lessons = await prisma.lesson.findMany({
        where: {
          practiceId: {
            in: practiceIds,
          },
        },
      });
      return lessons;
    } catch (err) {
      throw err;
    }
  }),
);
