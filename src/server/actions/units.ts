import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "../db/prisma";
import { type Subject } from "@prisma/client";

export const getUnitsBySubjectId = unstable_cache(
  cache(async (subjectId: Subject["id"]) => {
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
  ["units", "subjectId"],
);
