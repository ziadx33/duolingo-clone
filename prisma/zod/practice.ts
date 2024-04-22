import * as z from "zod"
import * as imports from "../null"

export const PracticeModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
})
