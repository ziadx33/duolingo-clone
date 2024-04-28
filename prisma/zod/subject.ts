import * as z from "zod"
import * as imports from "../null"
import { CompleteSection, RelatedSectionModel } from "./index"

export const SubjectModel = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
})

export interface CompleteSubject extends z.infer<typeof SubjectModel> {
  Section: CompleteSection[]
}

/**
 * RelatedSubjectModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSubjectModel: z.ZodSchema<CompleteSubject> = z.lazy(() => SubjectModel.extend({
  Section: RelatedSectionModel.array(),
}))
