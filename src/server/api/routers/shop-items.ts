import {
  doubleOrNothing,
  freezeStreak,
  getShopItems,
  maximizeHearts,
} from "@/server/actions/shop-items";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const shopItems = createTRPCRouter({
  getShopItems: publicProcedure.query(async () => {
    const items = await getShopItems();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return items;
  }),
  maximizeHearts: publicProcedure
    .input(
      z.object({ id: z.string(), currentGem: z.number(), costs: z.number() }),
    )
    .mutation(async ({ input }) => {
      const res = await maximizeHearts(input);
      return res;
    }),
  freezeStreak: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const res = await freezeStreak(input);
      return res;
    }),
  doubleOrNothing: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const res = await doubleOrNothing(input);
      return res;
    }),
});
