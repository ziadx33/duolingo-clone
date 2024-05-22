import { getShopItems } from "@/server/actions/shop-items";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const shopItems = createTRPCRouter({
  getShopItems: publicProcedure.query(async () => {
    const items = await getShopItems();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return items;
  }),
});
