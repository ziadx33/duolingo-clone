import * as z from "zod"
import * as imports from "../null"
import { CompleteSubject, RelatedSubjectModel } from "./index"

export const SectionModel = z.object({
  id: z.string(),
  description: z.string(),
  subjectId: z.string(),
  isCompleted: z.boolean(),
})

export interface CompleteSection extends z.infer<typeof SectionModel> {
  subject: CompleteSubject
}

/**
 * RelatedSectionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSectionModel: z.ZodSchema<CompleteSection> = z.lazy(() => SectionModel.extend({
  subject: RelatedSubjectModel,
}))
