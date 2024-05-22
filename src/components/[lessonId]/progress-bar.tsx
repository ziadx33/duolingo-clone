import { type QuestionType } from "@prisma/client";
import { Progress } from "../ui/progress";
import { useCallback } from "react";
import { useSession } from "@/hooks/use-session";
import Image from "next/image";
import { LeaveButton } from "./leave-button";

type ProgressBarProps = {
  currentQuestion: QuestionType;
  questionTypes: QuestionType[];
  isDone: boolean;
  completedQuestions: number;
};

export function ProgressBar({
  questionTypes,
  isDone,
  completedQuestions,
}: ProgressBarProps) {
  const { data: userData } = useSession();
  const progress = useCallback(() => {
    return (completedQuestions / questionTypes.length) * 100;
  }, [completedQuestions, questionTypes.length]);
  return (
    <div className="flex h-1 w-full items-center gap-2">
      <LeaveButton />
      <Progress value={!isDone ? progress() : 100} className="mb-0.5" />
      <div className="flex items-center gap-1 text-red-500">
        <Image
          src="/images/icons/heart.svg"
          width={25}
          height={25}
          alt="hearts"
        />
        {userData?.user?.hearts}
      </div>
    </div>
  );
}
