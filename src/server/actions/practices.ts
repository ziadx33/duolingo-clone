import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "../db/prisma";
import { type Unit } from "@prisma/client";

export const getPracticesByUnitId = unstable_cache(
  cache(async (unitId: Unit["id"]) => {
    try {
      const practices = await prisma.unit
        .findUnique({
          where: {
            id: unitId,
          },
        })
        .practices();
      return practices;
    } catch (err) {
      throw err;
    }
  }),
);

export const getPracticesByUnitIds = unstable_cache(
  cache(async (unitIds: Unit["id"][]) => {
    try {
      const practices = await prisma.practice.findMany({
        where: {
          unitId: {
            in: unitIds,
          },
        },
      });
      return practices;
    } catch (err) {
      throw err;
    }
  }),
  ["practices", "unitIds"],
);
