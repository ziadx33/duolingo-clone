import { cn } from "@/lib/utils";
import {
  type MutableRefObject,
  type Dispatch,
  type SetStateAction,
} from "react";
import { FaFlag } from "react-icons/fa";
import { Button } from "../ui/button";

type NextQuestionCardProps = {
  goNext: boolean;
  isCorrect: boolean;
  correctSolution: string | null;
  resetFn?: MutableRefObject<(() => void) | null>;
  setGoNext: Dispatch<SetStateAction<boolean>>;
  goNextQuestion: () => void;
};

export function NextQuestionCard({
  goNext,
  isCorrect,
  correctSolution,
  resetFn,
  setGoNext,
  goNextQuestion,
}: NextQuestionCardProps) {
  return (
    <div>
      <div
        className={cn(
          "absolute bottom-0 z-50 flex h-full w-full items-center gap-2.5 border-t bg-card px-12 transition-all duration-75 2xl:px-[30rem]",
          goNext ? "bottom-0" : "-bottom-40",
        )}
      >
        <div className="flex w-[80%] flex-col">
          <h1 className="mb-0 text-lg sm:mb-3 sm:text-2xl">
            {isCorrect
              ? "Good Job!"
              : correctSolution
                ? "Correct solution:"
                : "Wrong answer!"}
          </h1>
          <p className="sm:text-md sm:text-md flex items-center text-xs text-muted-foreground">
            {correctSolution ? (
              correctSolution
            ) : (
              <>
                <FaFlag className="mr-1.5 mt-1" />
                report
              </>
            )}
          </p>
        </div>
        <Button
          onClick={() => {
            if (!isCorrect) {
              resetFn?.current?.();
              setGoNext(false);
              return;
            }
            setGoNext(false);
            goNextQuestion();
          }}
          className="sm:mt-6"
        >
          {isCorrect ? "continue" : "try again"}
        </Button>
      </div>
    </div>
  );
}
