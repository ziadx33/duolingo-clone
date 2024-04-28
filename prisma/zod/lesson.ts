import * as z from "zod"
import * as imports from "../null"

export const LessonModel = z.object({
  id: z.string(),
  xp: z.number().int(),
  isCompleted: z.boolean(),
})
