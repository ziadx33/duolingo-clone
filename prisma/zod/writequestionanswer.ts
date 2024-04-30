import * as z from "zod"
import * as imports from "../null"
import { CompleteWriteQuestion, RelatedWriteQuestionModel } from "./index"

export const WriteQuestionAnswerModel = z.object({
  id: z.string(),
  correctSentence: z.string().array(),
  helpers: z.string().array(),
})

export interface CompleteWriteQuestionAnswer extends z.infer<typeof WriteQuestionAnswerModel> {
  WriteQuestion: CompleteWriteQuestion[]
}

/**
 * RelatedWriteQuestionAnswerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWriteQuestionAnswerModel: z.ZodSchema<CompleteWriteQuestionAnswer> = z.lazy(() => WriteQuestionAnswerModel.extend({
  WriteQuestion: RelatedWriteQuestionModel.array(),
}))
