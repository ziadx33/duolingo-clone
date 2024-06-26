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
  ["shop-items"],
);

type MaximizeHeartsFnParams = {
  id: string;
  currentGem: number;
  costs: number;
};

export const maximizeHearts = async ({
  id,
  currentGem,
  costs,
}: MaximizeHeartsFnParams) => {
  try {
    const res = await prisma.user.update({
      where: {
        id,
      },
      data: {
        hearts: 5,
        gem: currentGem - costs,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

type FreezeStreakFnParams = {
  id: string;
};

export const freezeStreak = async ({ id }: FreezeStreakFnParams) => {
  try {
    const res = await prisma.user.update({
      where: {
        id,
      },
      data: {
        freeze_streak: true,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};

export const doubleOrNothing = async ({ id }: FreezeStreakFnParams) => {
  try {
    const res = await prisma.user.update({
      where: {
        id,
      },
      data: {
        double_or_nothing: true,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};
