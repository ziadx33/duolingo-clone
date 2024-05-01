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

  const [done, setDone] = useState(true);
  const [correctSolution, setCorrectSolution] = useState<null | string>(null);
  const resetFn = useRef<(() => void) | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <>
      <div className="relative h-[85%] w-full">
        <div
          className={cn(
            "container flex h-full flex-col items-center",
            done ? "gap-0" : "gap-20",
          )}
        >
          <ProgressBar
            isDone={done}
            currentQuestion={currentQuestion}
            questionTypes={questionTypes}
          />
          <QuestionSection
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
      <div className="h-[15%] w-full border-t-2  pb-2">
        <Stats
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
    </>
  );
}
