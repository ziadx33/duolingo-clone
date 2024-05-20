/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { RotatingLines } from "react-loader-spinner";
import { Congrats } from "./congrats";
import {
  type HearingQuestion,
  type ChoosingQuestion,
  type QuestionType,
  type WriteQuestion as WriteQuestionType,
} from "@prisma/client";
import { WriteQuestion } from "./question-types/write-question";
import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
} from "react";
import { HearQuestion } from "./question-types/hear-question";
import { ChooseQuestion } from "./question-types/choose-question";

type QuestionDataType =
  | WriteQuestionType
  | HearingQuestion
  | ChoosingQuestion
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
  setCompletedDoneReqs: Dispatch<SetStateAction<boolean>>;
};

export type getInfoFnType = (
  correct: boolean,
  buttonShow: boolean,
  correctSolution: string | null,
  reset: (() => void) | null,
) => void;

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
  setCompletedDoneReqs,
}: QuestionSectionProps) {
  const getInfoFn: getInfoFnType = (
    correct,
    buttonShow,
    correctSolution,
    reset,
  ) => {
    setIsCorrect(correct);
    setIsButtonShow(buttonShow);
    setCorrectSolution(correctSolution);
    resetFn.current = reset;
  };
  return !done ? (
    !isQuestionLoading ? (
      currentQuestion.type === "WRITE" ? (
        <WriteQuestion
          getInfo={getInfoFn}
          {...(questionData as WriteQuestionType)}
        />
      ) : currentQuestion.type === "CHOOSE" ? (
        <ChooseQuestion
          getInfo={getInfoFn}
          {...(questionData as ChoosingQuestion)}
        />
      ) : (
        <HearQuestion
          getInfo={getInfoFn}
          {...(questionData as HearingQuestion)}
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
    <Congrats setCompletedDoneReqs={setCompletedDoneReqs} lessonId={lessonId} />
  );
}
