import * as z from "zod"
import * as imports from "../null"
import { CompletePractice, RelatedPracticeModel } from "./index"

export const LessonModel = z.object({
  id: z.string(),
  xp: z.number().int(),
  isCompleted: z.boolean(),
  practiceId: z.string().nullish(),
})

export interface CompleteLesson extends z.infer<typeof LessonModel> {
  Practice?: CompletePractice | null
}

/**
 * RelatedLessonModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLessonModel: z.ZodSchema<CompleteLesson> = z.lazy(() => LessonModel.extend({
  Practice: RelatedPracticeModel.nullish(),
}))
