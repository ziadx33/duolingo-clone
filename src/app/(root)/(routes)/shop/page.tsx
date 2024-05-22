import { Item } from "@/components/shop/item";
import { api } from "@/trpc/server";

export default async function Page() {
  const items = await api.shopItems.getShopItems();
  console.log(items);
  return (
    <div className="flex h-fit w-full flex-col">
      <h1 className="mb-4 text-2xl">Power-Ups</h1>
      {items.map((item) => (
        <Item key={item.id} {...item} />
      ))}
    </div>
  );
}