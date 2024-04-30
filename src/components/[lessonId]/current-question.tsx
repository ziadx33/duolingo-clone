import { type QuestionType } from "@prisma/client";
import { ProgressBar } from "./progress-bar";
import { Button } from "../ui/button";

type CurrentQuestionProps = {
  currentQuestion: QuestionType;
  questionTypes: QuestionType[];
};

export function CurrentQuestion({
  currentQuestion,
  questionTypes,
}: CurrentQuestionProps) {
  return (
    <>
      <div className="h-[85%] w-full">
        <div className="container h-full">
          <ProgressBar
            currentQuestion={currentQuestion}
            questionTypes={questionTypes}
          />
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
