"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type User, type Lesson, type Practice } from "@prisma/client";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaTrophy, FaCheck } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

type PracticeProps = {
  lastPractice: boolean;
  isNext: boolean;
  isCompleted: boolean;
  lessons: Lesson[];
  userData: User;
} & Practice;

export function Practice({
  lastPractice,
  isNext,
  isCompleted,
  title,
  lessons,
  userData,
}: PracticeProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const nextLesson = lessons.find((lesson, lessonIndex) => {
    console.log("lesson", lesson);
    return (
      userData.completedLessonIds.includes(lesson.id) ||
      (!!lessons[lessonIndex + 1] &&
        !userData.completedLessonIds.includes(lessons[lessonIndex + 1]!.id))
    );
  });
  console.log("next lesson", nextLesson);
  console.log(lessons);
  return (
    <Card className="relative grid h-24 w-24 place-items-center rounded-[50%] border-[0.5rem]">
      <Button
        onClick={() => setDialogOpen((v) => !v)}
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
      {
        <Card
          className={cn(
            "start-dialog absolute left-1/2 top-[4.2rem] z-10 flex  h-fit w-72 -translate-x-1/2 flex-col justify-between gap-4 rounded-3xl p-4 transition-opacity",
            dialogOpen ? "opacity-100" : "opacity-0",
          )}
        >
          <div>
            <h4>{title}</h4>
            <p className="text-muted-foreground">
              Lesson {lessons.indexOf(nextLesson!) + 1} of {lessons.length}
            </p>
          </div>
          <Button asChild>
            <Link href={`/lesson/${nextLesson?.id}`}>
              Start +{nextLesson?.xp}XP
            </Link>
          </Button>
        </Card>
      }
    </Card>
  );
}
