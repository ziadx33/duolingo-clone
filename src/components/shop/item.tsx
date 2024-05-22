import { type ShopItem } from "@prisma/client";
import Image from "next/image";
import { Card } from "../ui/card";
import { ItemBuy } from "./item-buy";

export function Item({ imgSrc, name, description, costs, type }: ShopItem) {
  return (
    <Card className="flex h-24 items-center gap-2 px-4 pt-2">
      <Image className="mb-1" src={imgSrc} width={60} height={60} alt={name} />
      <div className="flex flex-col">
        <h3 className="text-lg">{name}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="ml-auto flex h-full items-start pt-3">
        <ItemBuy costs={costs} type={type} />
      </div>
    </Card>
  );
}
