import * as z from "zod"
import * as imports from "../null"

export const ShopItemModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imgSrc: z.string(),
  costs: z.number().int(),
})
