"use client";

import { type ShopItem } from "@prisma/client";
import { Button } from "../ui/button";
import { useSession } from "@/hooks/use-session";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useTransition } from "react";

type ItemBuyProps = {
  costs: ShopItem["costs"];
  type: ShopItem["type"];
};

export function ItemBuy({ costs, type }: ItemBuyProps) {
  const { data: userData, update: updateUserData } = useSession();
  const [disabled, disabledTransition] = useTransition();
  const user = userData?.user;
  const { mutateAsync: maximizeHeartsFn } =
    api.shopItems.maximizeHearts.useMutation();
  const { mutateAsync: freezeStreak } =
    api.shopItems.freezeStreak.useMutation();
  const { mutateAsync: doubleOrNothing } =
    api.shopItems.doubleOrNothing.useMutation();
  return (
    <Button
      disabled={disabled}
      onClick={() => {
        disabledTransition(() => {
          if (!user) return;
          if (user.gem < costs) toast.error("you don't have enough gems!");
          else {
            let data: Parameters<typeof updateUserData>["0"] | null = null;
            if (type === "MAXIMIZE_HEARTS") {
              void maximizeHeartsFn({
                id: user?.id,
                currentGem: user.gem,
                costs,
              });
              data = {
                hearts: 5,
                gem: user.gem - costs,
              };
            }
            if (type === "STREAK_FREEZE") {
              void freezeStreak({ id: user?.id });
              data = {
                freeze_streak: true,
                gem: user.gem - costs,
              };
            }
            if (type === "DOUBLE_GEMS") {
              void doubleOrNothing({ id: user?.id });
              data = {
                double_or_nothing: true,
                gem: user.gem - costs,
              };
            }
            toast.promise(updateUserData(data!), {
              success() {
                return "done!";
              },
              loading: "buying...",
            });
          }
        });
      }}
    >
      {costs} gems
    </Button>
  );
}
