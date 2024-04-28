import * as z from "zod"
import * as imports from "../null"

export const UnitModel = z.object({
  id: z.string(),
  description: z.string(),
  isCompleted: z.boolean(),
})
