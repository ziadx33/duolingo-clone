import * as z from "zod"
import * as imports from "../null"
import { CompleteQuestionType, RelatedQuestionTypeModel } from "./index"

export const HearingQuestionModel = z.object({
  id: z.string(),
  sentenceSrc: z.string(),
  suggestedSentences: z.string().array(),
  correctSentence: z.string(),
})

export interface CompleteHearingQuestion extends z.infer<typeof HearingQuestionModel> {
  questions: CompleteQuestionType[]
}

/**
 * RelatedHearingQuestionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHearingQuestionModel: z.ZodSchema<CompleteHearingQuestion> = z.lazy(() => HearingQuestionModel.extend({
  questions: RelatedQuestionTypeModel.array(),
}))
