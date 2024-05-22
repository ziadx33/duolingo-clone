import { unstable_cache } from "next/cache";
import { cache } from "react";
import prisma from "../db/prisma";

export const getShopItems = unstable_cache(
  cache(async () => {
    try {
      const items = await prisma.shopItem.findMany();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return items;
    } catch (err) {
      throw err;
    }
  }),
);
