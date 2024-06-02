import * as z from "zod"
import * as imports from "../null"
import { CompleteSubject, RelatedSubjectModel, CompleteAccount, RelatedAccountModel, CompleteSession, RelatedSessionModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  password: z.string(),
  created_at: z.date(),
  currentSubjectId: z.string(),
  streak: z.number().int(),
  highest_streak: z.number().int(),
  last_streak: z.date(),
  gem: z.number().int(),
  hearts: z.number().int(),
  lastHeartIncrement: z.date(),
  totalXp: z.number().int(),
  current_xp: z.number().int(),
  last_xp_increment: z.date(),
  completed_quests_ids: z.string().array(),
  freeze_streak: z.boolean(),
  double_or_nothing: z.boolean(),
  completedUnitsIds: z.string().array(),
  completedPracticeIds: z.string().array(),
  completedLessonIds: z.string().array(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  currentSubject: CompleteSubject
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  currentSubject: RelatedSubjectModel,
  accounts: RelatedAccountModel.array(),
  sessions: RelatedSessionModel.array(),
}))
