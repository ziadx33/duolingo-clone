import * as z from "zod"
import * as imports from "../null"
import { SHOP_ITEM_TYPE } from "@prisma/client"

export const ShopItemModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imgSrc: z.string(),
  costs: z.number().int(),
  type: z.nativeEnum(SHOP_ITEM_TYPE),
})
