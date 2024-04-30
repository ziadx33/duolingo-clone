"use client";

import { type QuestionType } from "@prisma/client";
import { CurrentQuestion } from "./current-question";
import { useState } from "react";

type QuestionsProps = {
  questionTypes: QuestionType[];
};

export function Questions({ questionTypes }: QuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>(
    questionTypes[0] as QuestionType,
  );
  return (
    <main className="h-screen w-full pt-14">
      <CurrentQuestion
        questionTypes={questionTypes}
        currentQuestion={currentQuestion}
      />
    </main>
  );
}
