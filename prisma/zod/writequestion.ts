import * as z from "zod"
import * as imports from "../null"
import { CompleteQuestionType, RelatedQuestionTypeModel, CompleteWriteQuestionAnswer, RelatedWriteQuestionAnswerModel } from "./index"

export const WriteQuestionModel = z.object({
  id: z.string(),
  suggestedSentences: z.string().array(),
  correctSentenceVoice: z.string().nullish(),
  writeQuestionAnswerId: z.string(),
})

export interface CompleteWriteQuestion extends z.infer<typeof WriteQuestionModel> {
  questions: CompleteQuestionType[]
  correctSentence: CompleteWriteQuestionAnswer
}

/**
 * RelatedWriteQuestionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWriteQuestionModel: z.ZodSchema<CompleteWriteQuestion> = z.lazy(() => WriteQuestionModel.extend({
  questions: RelatedQuestionTypeModel.array(),
  correctSentence: RelatedWriteQuestionAnswerModel,
}))
