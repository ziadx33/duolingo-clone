import {
  type WriteQuestion as WriteQuestionType,
  type QuestionType,
} from "@prisma/client";
import { ProgressBar } from "./progress-bar";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import { WriteQuestion } from "./question-types/write-question";
import { RotatingLines } from "react-loader-spinner";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaFlag } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { IoMdClose } from "react-icons/io";

type CurrentQuestionProps = {
  currentQuestion: QuestionType;
  questionTypes: QuestionType[];
};

export function CurrentQuestion({
  currentQuestion,
  questionTypes,
}: CurrentQuestionProps) {
  const { data, isLoading: isQuestionLoading } =
    api.questionTypes.getQuestionByQuestionType.useQuery({
      questionType: currentQuestion,
    });
  const [isCorrect, setIsCorrect] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(true);
  const [goNext, setGoNext] = useState(false);
  const [correctSolution, setCorrectSolution] = useState<null | string>(null);
  const resetFn = useRef<(() => void) | null>(null);
  const correctSound = new Audio(
    "https://d35aaqx5ub95lt.cloudfront.net/sounds/37d8f0b39dcfe63872192c89653a93f6.mp3",
  );
  const incorrectSound = new Audio(
    "https://d35aaqx5ub95lt.cloudfront.net/sounds/f0b6ab4396d5891241ef4ca73b4de13a.mp3",
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);
  return (
    <>
      <div className="relative h-[85%] w-full">
        <div className="container flex h-full flex-col items-center gap-20">
          <ProgressBar
            currentQuestion={currentQuestion}
            questionTypes={questionTypes}
          />
          {!isQuestionLoading ? (
            currentQuestion.type === "WRITE" && (
              <WriteQuestion
                getInfo={(correct, buttonShow, correctSolution, reset) => {
                  console.log(correct);
                  setIsCorrect(correct);
                  setIsButtonShow(buttonShow);
                  setCorrectSolution(correctSolution);
                  resetFn.current = reset;
                }}
                {...(data as WriteQuestionType)}
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
          )}
        </div>
      </div>
      <div className="h-[15%] w-full border-t-2  pb-2">
        <div className="container flex h-full items-center justify-between px-96">
          <Button variant="outline">Skip</Button>
          <Button
            onClick={async () => {
              setGoNext(true);
              if (!isCorrect) {
                incorrectSound.volume = 0.5;
                return await incorrectSound.play();
              }
              correctSound.volume = 0.5;
              await correctSound.play();
            }}
            disabled={isButtonShow}
          >
            check
          </Button>
        </div>
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
                  resetFn.current?.();
                  setGoNext(false);
                }
              }}
              className="mt-6"
            >
              {isCorrect ? "continue" : "try again"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
