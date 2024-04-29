import { Card } from "@/components/ui/card";
import { type Unit } from "@prisma/client";
import { Practice } from "../practices/practice";
import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";

type UnitProps = { unitIndex: number } & Unit;

export async function Unit({ unitIndex, description, id }: UnitProps) {
  const practices = await api.practices.getPracticesByUnitId({ unitId: id });
  const { user } = await getServerAuthSession();
  return (
    <div className="flex flex-col gap-10">
      <Card className="flex h-24 w-full items-center justify-between p-4">
        <div>
          <h3 className="text-md mb-2 text-muted-foreground">
            Unit {unitIndex}
          </h3>
          <h2 className="text-xl font-bold">{description}</h2>
        </div>
      </Card>
      <div className="flex flex-col items-center justify-center gap-6">
        {practices?.map((practice, practiceIndex) => (
          <Practice
            isNext={
              !(
                !user?.completedLessonIds.includes(practice.id) &&
                practiceIndex > 0 &&
                !user?.completedPracticeIds.includes(
                  practices[practiceIndex - 1]!.id,
                )
              )
            }
            isCompleted={!!user?.completedPracticeIds.includes(practice.id)}
            lastPractice={practices.length === practiceIndex + 1}
            practiceIndex={practiceIndex}
            key={practice.id}
            {...practice}
          />
        ))}
      </div>
    </div>
  );
}
