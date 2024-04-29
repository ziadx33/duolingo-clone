import * as z from "zod"
import * as imports from "../null"
import { CompleteUnit, RelatedUnitModel, CompleteLesson, RelatedLessonModel } from "./index"

export const PracticeModel = z.object({
  id: z.string(),
  title: z.string(),
  unitId: z.string().nullish(),
})

export interface CompletePractice extends z.infer<typeof PracticeModel> {
  Unit?: CompleteUnit | null
  lessons: CompleteLesson[]
}

/**
 * RelatedPracticeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPracticeModel: z.ZodSchema<CompletePractice> = z.lazy(() => PracticeModel.extend({
  Unit: RelatedUnitModel.nullish(),
  lessons: RelatedLessonModel.array(),
}))
