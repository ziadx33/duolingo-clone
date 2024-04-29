"use server";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "../db/prisma";

export const getSubject = unstable_cache(
  cache(async (id: string) => {
    try {
      const subject = await prisma.subject.findUnique({
        where: {
          id,
        },
      });
      return subject;
    } catch (err) {
      throw err;
    }
  }),
  ["subject", "id"],
);

export const getSubjectsIn = unstable_cache(
  cache(async (ids: string[]) => {
    try {
      const subjects = await prisma.subject.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return subjects;
    } catch (err) {
      throw err;
    }
  }),
);

export const getSubjects = unstable_cache(
  cache(async () => {
    try {
      const subjects = await prisma.subject.findMany();
      return subjects;
    } catch (err) {
      throw err;
    }
  }),
  ["subjects"],
);
