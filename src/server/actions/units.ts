import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "../db/prisma";

export const getUnitsBySubjectId = unstable_cache(
  cache(async (subjectId: string) => {
    try {
      const units = await prisma.subject
        .findUnique({
          where: {
            id: subjectId,
          },
        })
        .units();
      return units;
    } catch (err) {
      throw err;
    }
  }),
  ["units"],
);
