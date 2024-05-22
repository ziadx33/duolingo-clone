import { getQuests } from "@/server/actions/quests";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const quests = createTRPCRouter({
  getQuests: publicProcedure.query(async () => {
    const quests = await getQuests();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return quests;
  }),
});
