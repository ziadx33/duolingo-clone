import * as z from "zod"
import * as imports from "../null"
import { QUESTIONTYPE } from "@prisma/client"
import { CompleteLesson, RelatedLessonModel, CompleteHearingQuestion, RelatedHearingQuestionModel, CompleteChoosingQuestion, RelatedChoosingQuestionModel, CompleteWriteQuestion, RelatedWriteQuestionModel } from "./index"

export const QuestionTypeModel = z.object({
  id: z.string(),
  lessonId: z.string().nullish(),
  type: z.nativeEnum(QUESTIONTYPE),
  hearingId: z.string().nullish(),
  choosingId: z.string().nullish(),
  writeId: z.string().nullish(),
})

export interface CompleteQuestionType extends z.infer<typeof QuestionTypeModel> {
  Lesson?: CompleteLesson | null
  hearingQuestion?: CompleteHearingQuestion | null
  choosingQuestion?: CompleteChoosingQuestion | null
  WriteQuestion?: CompleteWriteQuestion | null
}

/**
 * RelatedQuestionTypeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuestionTypeModel: z.ZodSchema<CompleteQuestionType> = z.lazy(() => QuestionTypeModel.extend({
  Lesson: RelatedLessonModel.nullish(),
  hearingQuestion: RelatedHearingQuestionModel.nullish(),
  choosingQuestion: RelatedChoosingQuestionModel.nullish(),
  WriteQuestion: RelatedWriteQuestionModel.nullish(),
}))
