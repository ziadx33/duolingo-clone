"use client";

import { type Lesson, type Practice } from "@prisma/client";
import { Practice as PracticeComp } from "./practice";
import { useSession } from "@/hooks/use-session";

type PracticesProps = {
  practices: Practice[] | null;
  lessons: Lesson[];
};

export function Practices({ practices, lessons }: PracticesProps) {
  const { data } = useSession();
  const user = data?.user;
  return practices?.map((practice, practiceIndex) => (
    <PracticeComp
      isNext={
        !(
          !user?.completedPracticeIds.includes(practice.id) &&
          practiceIndex > 0 &&
          !user?.completedPracticeIds.includes(practices[practiceIndex - 1]!.id)
        )
      }
      lessons={lessons.filter((lesson) => lesson.practiceId === practice.id)}
      userData={user}
      isCompleted={!!user?.completedPracticeIds.includes(practice.id)}
      lastPractice={practices.length === practiceIndex + 1}
      key={practice.id}
      {...practice}
    />
  ));
}
