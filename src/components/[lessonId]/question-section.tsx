import { RotatingLines } from "react-loader-spinner";
import { Congrats } from "./congrats";
import {
  type ListeningQuestion,
  type SelectCorrectVoiceQuestion,
  type QuestionType,
  type WriteQuestion as WriteQuestionType,
} from "@prisma/client";
import { WriteQuestion } from "./question-types/write-question";
import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
} from "react";

type QuestionDataType =
  | WriteQuestionType
  | ListeningQuestion
  | SelectCorrectVoiceQuestion
  | null
  | undefined;

type QuestionSectionProps = {
  done: boolean;
  isQuestionLoading: boolean;
  currentQuestion: QuestionType;
  questionData: QuestionDataType;
  lessonId: string;
  setIsCorrect: Dispatch<SetStateAction<boolean>>;
  setIsButtonShow: Dispatch<SetStateAction<boolean>>;
  setCorrectSolution: Dispatch<SetStateAction<string | null>>;
  resetFn: MutableRefObject<(() => void) | null>;
};

export function QuestionSection({
  done,
  isQuestionLoading,
  currentQuestion,
  questionData,
  lessonId,
  setIsCorrect,
  setIsButtonShow,
  setCorrectSolution,
  resetFn,
}: QuestionSectionProps) {
  return !done ? (
    !isQuestionLoading ? (
      currentQuestion.type === "WRITE" && (
        <WriteQuestion
          getInfo={(correct, buttonShow, correctSolution, reset) => {
            console.log(correct);
            setIsCorrect(correct);
            setIsButtonShow(buttonShow);
            setCorrectSolution(correctSolution);
            resetFn.current = reset;
          }}
          {...(questionData as WriteQuestionType)}
        />
      )
    ) : (
      <div className="mb-56 grid h-full w-[50rem] place-items-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="70"
          visible={true}
        />
      </div>
    )
  ) : (
    <Congrats lessonId={lessonId} />
  );
}
