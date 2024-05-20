import {
  type Dispatch,
  type SetStateAction,
  useState,
  type MutableRefObject,
} from "react";
import { BottomBar } from "./bottom-bar";
import { NextQuestionCard } from "./next-question-card";
import { type QuestionType } from "@prisma/client";

type StatsProps = {
  done: boolean;
  isButtonShow: boolean;
  isCorrect: boolean;
  correctSolution: string | null;
  resetFn?: MutableRefObject<(() => void) | null>;
  playedQuestionsIds: MutableRefObject<QuestionType["id"][]>;
  currentQuestion: QuestionType;
  questionTypes: QuestionType[];
  setCurrentQuestion?: Dispatch<SetStateAction<QuestionType>>;
  setDone?: Dispatch<SetStateAction<boolean>>;
  completedDoneReqs: boolean;
};

export function Stats({
  done,
  isButtonShow,
  isCorrect,
  correctSolution,
  resetFn,
  playedQuestionsIds,
  currentQuestion,
  questionTypes,
  setCurrentQuestion,
  setDone,
  completedDoneReqs,
}: StatsProps) {
  const [goNext, setGoNext] = useState(false);

  const goNextQuestion = () => {
    const newPlayedQuestions = [
      ...playedQuestionsIds.current,
      currentQuestion.id,
    ];
    playedQuestionsIds.current = newPlayedQuestions;
    const filteredQuestionTypes = questionTypes.filter(
      (questionType) => !newPlayedQuestions.includes(questionType.id),
    );
    const nextQuestion =
      filteredQuestionTypes[
        Math.floor(Math.random() * filteredQuestionTypes.length)
      ];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (!nextQuestion) return setDone?.(true);
    setCurrentQuestion?.(nextQuestion);
  };
  return (
    <>
      <BottomBar
        completedDoneReqs={completedDoneReqs}
        setGoNext={setGoNext}
        done={done}
        goNextQuestion={goNextQuestion}
        isCorrect={isCorrect}
        isButtonShow={isButtonShow}
      />
      <NextQuestionCard
        goNext={goNext}
        isCorrect={isCorrect}
        correctSolution={correctSolution}
        resetFn={resetFn}
        setGoNext={setGoNext}
        goNextQuestion={goNextQuestion}
      />
    </>
  );
}
