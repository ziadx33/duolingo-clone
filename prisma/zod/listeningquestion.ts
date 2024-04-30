import * as z from "zod"
import * as imports from "../null"
import { CompleteQuestionType, RelatedQuestionTypeModel } from "./index"

export const ListeningQuestionModel = z.object({
  id: z.string(),
})

export interface CompleteListeningQuestion extends z.infer<typeof ListeningQuestionModel> {
  questions: CompleteQuestionType[]
}

/**
 * RelatedListeningQuestionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedListeningQuestionModel: z.ZodSchema<CompleteListeningQuestion> = z.lazy(() => ListeningQuestionModel.extend({
  questions: RelatedQuestionTypeModel.array(),
}))
