import * as z from "zod"
import * as imports from "../null"
import { CompleteQuestionType, RelatedQuestionTypeModel } from "./index"

export const SelectCorrectVoiceQuestionModel = z.object({
  id: z.string(),
})

export interface CompleteSelectCorrectVoiceQuestion extends z.infer<typeof SelectCorrectVoiceQuestionModel> {
  questions: CompleteQuestionType[]
}

/**
 * RelatedSelectCorrectVoiceQuestionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSelectCorrectVoiceQuestionModel: z.ZodSchema<CompleteSelectCorrectVoiceQuestion> = z.lazy(() => SelectCorrectVoiceQuestionModel.extend({
  questions: RelatedQuestionTypeModel.array(),
}))
