import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type Practice } from "@prisma/client";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaTrophy, FaCheck } from "react-icons/fa";

type PracticeProps = {
  practiceIndex: number;
  lastPractice: boolean;
  isNext: boolean;
  isCompleted: boolean;
} & Practice;

export function Practice({ lastPractice, isNext, isCompleted }: PracticeProps) {
  return (
    <Card className="grid h-24 w-24 place-items-center rounded-[50%] border-[0.5rem]">
      <Button
        disabled={!isCompleted && !isNext}
        variant="ghost"
        className="h-[85%] w-[85%] rounded-[50%] disabled:opacity-100"
      >
        {!isCompleted ? (
          lastPractice ? (
            <FaTrophy
              className={cn(
                "scale-[2.5]",
                isNext ? "fill-foreground" : "fill-muted",
              )}
            />
          ) : (
            <MdOutlineStarPurple500
              className={cn(
                "scale-[2.5]",
                isNext ? "fill-foreground" : "fill-muted",
              )}
            />
          )
        ) : (
          <FaCheck
            className={cn(
              "scale-[2]",
              isNext ? "fill-foreground" : "fill-muted",
            )}
          />
        )}
      </Button>
    </Card>
  );
}
