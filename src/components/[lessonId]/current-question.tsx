import { type QuestionType } from "@prisma/client";
import { ProgressBar } from "./progress-bar";
import { api } from "@/trpc/react";
import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Stats } from "./stats";
import { QuestionSection } from "./question-section";

type CurrentQuestionProps = {
  currentQuestion: QuestionType;
  questionTypes: QuestionType[];
  playedQuestionsIds: MutableRefObject<QuestionType["id"][]>;
  setCurrentQuestion?: Dispatch<SetStateAction<QuestionType>>;
  lessonId: string;
};

export function CurrentQuestion({
  currentQuestion,
  questionTypes,
  playedQuestionsIds,
  setCurrentQuestion,
  lessonId,
}: CurrentQuestionProps) {
  const { data, isLoading: isQuestionLoading } =
    api.questionTypes.getQuestionByQuestionType.useQuery({
      questionType: currentQuestion,
    });
  const [isCorrect, setIsCorrect] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(true);

  const [done, setDone] = useState(false);
  const [correctSolution, setCorrectSolution] = useState<null | string>(null);
  const resetFn = useRef<(() => void) | null>(null);
  const [completedDoneReqs, setCompletedDoneReqs] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="relative h-[90%] w-full">
        <div
          className={cn(
            "container flex h-full flex-col items-center pt-10",
            done ? "gap-0" : "gap-10 sm:gap-20",
          )}
        >
          <ProgressBar
            completedQuestions={playedQuestionsIds.current.length}
            isDone={done}
            currentQuestion={currentQuestion}
            questionTypes={questionTypes}
          />
          <QuestionSection
            setCompletedDoneReqs={setCompletedDoneReqs}
            done={done}
            currentQuestion={currentQuestion}
            isQuestionLoading={isQuestionLoading}
            questionData={data}
            lessonId={lessonId}
            setIsCorrect={setIsCorrect}
            setIsButtonShow={setIsButtonShow}
            setCorrectSolution={setCorrectSolution}
            resetFn={resetFn}
          />
        </div>
      </div>
      <div className="relative h-[10%] w-full border-t-2 pb-2 sm:h-[15%]">
        <Stats
          completedDoneReqs={completedDoneReqs}
          correctSolution={correctSolution}
          isCorrect={isCorrect}
          isButtonShow={isButtonShow}
          resetFn={resetFn}
          done={done}
          currentQuestion={currentQuestion}
          playedQuestionsIds={playedQuestionsIds}
          setCurrentQuestion={setCurrentQuestion}
          setDone={setDone}
          questionTypes={questionTypes}
        />
      </div>
    </div>
  );
}
