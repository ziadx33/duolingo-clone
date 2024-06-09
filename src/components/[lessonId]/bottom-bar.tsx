import { type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks/use-session";
import { api } from "@/trpc/react";

type BottomBar = {
  done: boolean;
  goNextQuestion(): void;
  isCorrect: boolean;
  setGoNext: Dispatch<SetStateAction<boolean>>;
  isButtonShow: boolean;
  completedDoneReqs: boolean;
};

export function BottomBar({
  done,
  goNextQuestion,
  setGoNext,
  isCorrect,
  isButtonShow,
  completedDoneReqs,
}: BottomBar) {
  const { update: updateUserData, data: userData } = useSession();
  const { mutate: revalidatePath } = api.revalidate.useMutation();
  const router = useRouter();
  const correctSound = new Audio(
    "https://d35aaqx5ub95lt.cloudfront.net/sounds/37d8f0b39dcfe63872192c89653a93f6.mp3",
  );
  const incorrectSound = new Audio(
    "https://d35aaqx5ub95lt.cloudfront.net/sounds/f0b6ab4396d5891241ef4ca73b4de13a.mp3",
  );
  return (
    <div className="container flex h-full w-full items-center justify-between pt-2 md:px-24 lg:px-48 xl:px-96">
      {!done && (
        <Button variant="outline" onClick={goNextQuestion}>
          Skip
        </Button>
      )}
      <Button
        onClick={async () => {
          if (done) {
            revalidatePath("/leaderboard");
            return router.push("/learn");
          }
          setGoNext(true);
          if (!isCorrect) {
            incorrectSound.volume = 0.5;
            void incorrectSound.play();
            const currentHearts = (userData?.user?.hearts ?? 0) - 1;
            await updateUserData({
              hearts: currentHearts,
            });
            if (currentHearts === 0) router.push("/learn");
            return;
          }
          correctSound.volume = 0.5;
          await correctSound.play();
        }}
        disabled={!isButtonShow || !completedDoneReqs}
        className={cn(done && "w-full")}
      >
        {!done ? "check" : completedDoneReqs ? "continue" : "loading..."}
      </Button>
    </div>
  );
}
