import { cn } from "@/lib/utils";
import {
  type MutableRefObject,
  type Dispatch,
  type SetStateAction,
} from "react";
import { FaCheck, FaFlag } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
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
          "absolute bottom-0 z-50 flex h-40 w-full items-start gap-2.5 border-t-2 bg-card px-[30rem] py-8 transition-all duration-75",
          goNext ? "bottom-0" : "-bottom-40",
        )}
      >
        <div className="grid h-20 w-20 place-items-center rounded-[50%] border-2 bg-secondary">
          {isCorrect ? <FaCheck size={30} /> : <IoMdClose size={40} />}
        </div>
        <div className="flex w-[80%] flex-col">
          <h1 className="mb-3 text-2xl">
            {isCorrect
              ? "Good Job!"
              : correctSolution
                ? "Correct solution:"
                : "Wrong answer!"}
          </h1>
          <p className="flex items-center text-muted-foreground">
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
          className="mt-6"
        >
          {isCorrect ? "continue" : "try again"}
        </Button>
      </div>
    </div>
  );
}
