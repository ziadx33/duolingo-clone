import { type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type BottomBar = {
  done: boolean;
  goNextQuestion(): void;
  isCorrect: boolean;
  setGoNext: Dispatch<SetStateAction<boolean>>;
  isButtonShow: boolean;
};

export function BottomBar({
  done,
  goNextQuestion,
  setGoNext,
  isCorrect,
  isButtonShow,
}: BottomBar) {
  console.log("show", isButtonShow);
  const correctSound = new Audio(
    "https://d35aaqx5ub95lt.cloudfront.net/sounds/37d8f0b39dcfe63872192c89653a93f6.mp3",
  );
  const incorrectSound = new Audio(
    "https://d35aaqx5ub95lt.cloudfront.net/sounds/f0b6ab4396d5891241ef4ca73b4de13a.mp3",
  );
  return (
    <div className="container flex h-full items-center justify-between px-96">
      {!done && (
        <Button variant="outline" onClick={goNextQuestion}>
          Skip
        </Button>
      )}
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
        disabled={!isButtonShow}
        className={cn(done && "w-full")}
      >
        {!done ? "check" : "continue"}
      </Button>
    </div>
  );
}
