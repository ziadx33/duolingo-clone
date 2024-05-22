"use client";

import { type ShopItem } from "@prisma/client";
import { Button } from "../ui/button";
import { useSession } from "@/hooks/use-session";
import { api } from "@/trpc/react";
import { toast } from "sonner";

type ItemBuyProps = {
  costs: ShopItem["costs"];
  type: ShopItem["type"];
};

export function ItemBuy({ costs, type }: ItemBuyProps) {
  const { data: userData, update: updateUserData } = useSession();
  const user = userData?.user;
  const { mutateAsync: maximizeHeartsFn } =
    api.shopItems.maximizeHearts.useMutation();
  return (
    <Button
      onClick={() => {
        if (!user) return;
        if (type === "MAXIMIZE_HEARTS") {
          if (user.gem < costs) toast.error("you don't have enough gems!");
          void maximizeHeartsFn({ id: user?.id, currentGem: user.gem, costs });
          void updateUserData({
            hearts: 5,
            gem: user.gem - costs,
          });
        }
      }}
    >
      {costs} gems
    </Button>
  );
}
