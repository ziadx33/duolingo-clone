import * as z from "zod"
import * as imports from "../null"
import { CompleteQuestionType, RelatedQuestionTypeModel } from "./index"

export const ChoosingQuestionModel = z.object({
  id: z.string(),
  correctSentence: z.string(),
  suggestedSentences: z.string().array(),
  suggestedSentencesSrcs: z.string().array(),
})

export interface CompleteChoosingQuestion extends z.infer<typeof ChoosingQuestionModel> {
  questions: CompleteQuestionType[]
}

/**
 * RelatedChoosingQuestionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedChoosingQuestionModel: z.ZodSchema<CompleteChoosingQuestion> = z.lazy(() => ChoosingQuestionModel.extend({
  questions: RelatedQuestionTypeModel.array(),
}))
