"use client";

import { type QuestionType } from "@prisma/client";
import { CurrentQuestion } from "./current-question";
import { useRef, useState } from "react";

type QuestionsProps = {
  questionTypes: QuestionType[];
  lessonId: string;
};

export function Questions({ questionTypes, lessonId }: QuestionsProps) {
  const playedQuestionsIds = useRef<QuestionType["id"][]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>(
    questionTypes[
      Math.floor(
        Math.random() *
          questionTypes.filter(
            (questionType) =>
              !playedQuestionsIds.current.includes(questionType.id),
          ).length,
      )
    ]!,
  );
  return (
    <main className="h-screen w-full">
      <CurrentQuestion
        lessonId={lessonId}
        setCurrentQuestion={setCurrentQuestion}
        playedQuestionsIds={playedQuestionsIds}
        questionTypes={questionTypes}
        currentQuestion={currentQuestion}
      />
    </main>
  );
}
