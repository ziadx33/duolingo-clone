import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "../db/prisma";

export const getAchievements = unstable_cache(
  cache(async () => {
    try {
      const achievements = await prisma.achievement.findMany();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return achievements;
    } catch (err) {
      throw err;
    }
  }),
);
