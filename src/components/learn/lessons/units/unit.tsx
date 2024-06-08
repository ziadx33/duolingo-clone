import { Card } from "@/components/ui/card";
import { type Unit } from "@prisma/client";
import { api } from "@/trpc/server";
import { Practices } from "../practices/practices";

type UnitProps = { unitIndex: number } & Unit;

export async function Unit({ unitIndex, description, id }: UnitProps) {
  const practices = await api.practices.getPracticesByUnitId({ unitId: id });
  const lessons = await api.lessons.getLessonsByPracticeIds({
    practiceIds: practices?.map((practice) => practice.id) ?? [],
  });
  return (
    <div className="mx-4 mt-6 flex h-full flex-col gap-10 xl:mt-0">
      <Card className=" flex h-24 w-full items-center justify-between p-4 xl:mt-0">
        <div>
          <h3 className="text-md mb-2 text-muted-foreground">
            Unit {unitIndex}
          </h3>
          <h2 className="text-xl font-bold">{description}</h2>
        </div>
      </Card>
      <div className="flex flex-col items-center justify-center gap-6">
        <Practices lessons={lessons} practices={practices} />
      </div>
    </div>
  );
}
