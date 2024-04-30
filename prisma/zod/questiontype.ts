import * as z from "zod"
import * as imports from "../null"
import { QUESTIONTYPE } from "@prisma/client"
import { CompleteLesson, RelatedLessonModel, CompleteListeningQuestion, RelatedListeningQuestionModel, CompleteSelectCorrectVoiceQuestion, RelatedSelectCorrectVoiceQuestionModel, CompleteWriteQuestion, RelatedWriteQuestionModel } from "./index"

export const QuestionTypeModel = z.object({
  id: z.string(),
  lessonId: z.string().nullish(),
  type: z.nativeEnum(QUESTIONTYPE),
  listeningId: z.string().nullish(),
  selectCorrectVoiceId: z.string().nullish(),
  writeId: z.string().nullish(),
})

export interface CompleteQuestionType extends z.infer<typeof QuestionTypeModel> {
  Lesson?: CompleteLesson | null
  listeningQuestion?: CompleteListeningQuestion | null
  SelectCorrectVoiceQuestion?: CompleteSelectCorrectVoiceQuestion | null
  WriteQuestion?: CompleteWriteQuestion | null
}

/**
 * RelatedQuestionTypeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuestionTypeModel: z.ZodSchema<CompleteQuestionType> = z.lazy(() => QuestionTypeModel.extend({
  Lesson: RelatedLessonModel.nullish(),
  listeningQuestion: RelatedListeningQuestionModel.nullish(),
  SelectCorrectVoiceQuestion: RelatedSelectCorrectVoiceQuestionModel.nullish(),
  WriteQuestion: RelatedWriteQuestionModel.nullish(),
}))
