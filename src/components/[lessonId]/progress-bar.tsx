import { type QuestionType } from "@prisma/client";
import { Progress } from "../ui/progress";
import { useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { useSession } from "@/hooks/use-session";
import Image from "next/image";

type ProgressBarProps = {
  currentQuestion: QuestionType;
  questionTypes: QuestionType[];
};

export function ProgressBar({
  questionTypes,
  currentQuestion,
}: ProgressBarProps) {
  const { data: userData } = useSession();
  const progress = useCallback(() => {
    return (
      (questionTypes.indexOf(currentQuestion) / questionTypes.length) * 100
    );
  }, [currentQuestion, questionTypes]);
  return (
    <div className="flex h-1 w-full items-center gap-2">
      <button>
        <IoMdClose size={25} />
      </button>
      <Progress value={progress()} className="mb-0.5" />
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
