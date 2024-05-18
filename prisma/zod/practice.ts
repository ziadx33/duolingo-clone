import * as z from "zod"
import * as imports from "../null"
import { CompleteUnit, RelatedUnitModel, CompleteLesson, RelatedLessonModel } from "./index"

export const PracticeModel = z.object({
  id: z.string(),
  title: z.string(),
  unitId: z.string(),
})

export interface CompletePractice extends z.infer<typeof PracticeModel> {
  Unit: CompleteUnit
  lessons: CompleteLesson[]
}

/**
 * RelatedPracticeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPracticeModel: z.ZodSchema<CompletePractice> = z.lazy(() => PracticeModel.extend({
  Unit: RelatedUnitModel,
  lessons: RelatedLessonModel.array(),
}))
