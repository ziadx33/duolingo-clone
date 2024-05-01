import {
  type WriteQuestion as WriteQuestionType,
  type QuestionType,
} from "@prisma/client";
import { ProgressBar } from "./progress-bar";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
import { WriteQuestion } from "./question-types/write-question";
import { RotatingLines } from "react-loader-spinner";

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

  console.log(data);
  return (
    <>
      <div className="h-[85%] w-full">
        <div className="container flex h-full flex-col items-center gap-20">
          <ProgressBar
            currentQuestion={currentQuestion}
            questionTypes={questionTypes}
          />
          {!isQuestionLoading ? (
            currentQuestion.type === "WRITE" && (
              <WriteQuestion {...(data as WriteQuestionType)} />
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
          <Button>check</Button>
        </div>
      </div>
    </>
  );
}
