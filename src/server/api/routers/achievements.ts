import { getAchievements } from "@/server/actions/achievements";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const achievements = createTRPCRouter({
  getAchievements: publicProcedure.query(async () => {
    const achievements = await getAchievements();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return achievements;
  }),
});
