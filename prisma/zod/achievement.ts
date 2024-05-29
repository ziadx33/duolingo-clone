import * as z from "zod"
import * as imports from "../null"
import { ACHIEVEMENT_TYPE } from "@prisma/client"

export const AchievementModel = z.object({
  id: z.string(),
  name: z.string(),
  imgSrc: z.string(),
  type: z.nativeEnum(ACHIEVEMENT_TYPE),
  levels: z.number().int(),
  max: z.number().int(),
})
