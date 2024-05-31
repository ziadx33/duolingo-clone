import { type ShopItem } from "@prisma/client";
import Image from "next/image";
import { Card } from "../ui/card";
import { ItemBuy } from "./item-buy";

export function Item({ imgSrc, name, description, costs, type }: ShopItem) {
  const size = type !== "MAXIMIZE_HEARTS" ? 100 : 80;
  return (
    <Card className="flex h-28 gap-2 pl-2 pr-4 pt-2">
      <div className="relative my-auto h-20 w-24">
        <Image
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          src={imgSrc}
          width={size}
          height={size}
          alt={name}
        />
      </div>
      <div className="my-auto flex h-fit w-96 flex-col">
        <h3 className="text-lg">{name}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="ml-auto flex h-full items-start pt-4">
        <ItemBuy costs={costs} type={type} />
      </div>
    </Card>
  );
}
