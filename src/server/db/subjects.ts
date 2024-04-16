import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "./prisma";

export const getSubjects = unstable_cache(
  cache(async () => {
    try {
      const subjects = await prisma.subject.findMany();
      return subjects;
    } catch (error) {
      throw error;
    }
  }),
);
