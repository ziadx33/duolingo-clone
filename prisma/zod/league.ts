import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, RelatedUserModel } from "./index"

export const LeagueModel = z.object({
  id: z.string(),
  img_src: z.string(),
  name: z.string(),
  level: z.number().int(),
  top_won: z.number().int(),
  top_lose: z.number().int().nullish(),
})

export interface CompleteLeague extends z.infer<typeof LeagueModel> {
  User: CompleteUser[]
}

/**
 * RelatedLeagueModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLeagueModel: z.ZodSchema<CompleteLeague> = z.lazy(() => LeagueModel.extend({
  User: RelatedUserModel.array(),
}))
