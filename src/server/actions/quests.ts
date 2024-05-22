import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "../db/prisma";

export const getQuests = unstable_cache(
  cache(async () => {
    try {
      const quests = await prisma.quest.findMany();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return quests;
    } catch (err) {
      throw err;
    }
  }),
  ["quests"],
);
