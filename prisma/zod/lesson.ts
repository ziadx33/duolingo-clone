import * as z from "zod"
import * as imports from "../null"
import { CompletePractice, RelatedPracticeModel, CompleteQuestionType, RelatedQuestionTypeModel } from "./index"

export const LessonModel = z.object({
  id: z.string(),
  xp: z.number().int(),
  practiceId: z.string(),
})

export interface CompleteLesson extends z.infer<typeof LessonModel> {
  Practice: CompletePractice
  questions: CompleteQuestionType[]
}

/**
 * RelatedLessonModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedLessonModel: z.ZodSchema<CompleteLesson> = z.lazy(() => LessonModel.extend({
  Practice: RelatedPracticeModel,
  questions: RelatedQuestionTypeModel.array(),
}))
