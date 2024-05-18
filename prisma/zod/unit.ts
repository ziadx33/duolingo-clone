import * as z from "zod"
import * as imports from "../null"
import { CompleteSubject, RelatedSubjectModel, CompletePractice, RelatedPracticeModel } from "./index"

export const UnitModel = z.object({
  id: z.string(),
  description: z.string(),
  subjectId: z.string(),
})

export interface CompleteUnit extends z.infer<typeof UnitModel> {
  Subject: CompleteSubject
  practices: CompletePractice[]
}

/**
 * RelatedUnitModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUnitModel: z.ZodSchema<CompleteUnit> = z.lazy(() => UnitModel.extend({
  Subject: RelatedSubjectModel,
  practices: RelatedPracticeModel.array(),
}))
