import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Unit } from "./units/unit";

export async function Lessons() {
  const { user } = await getServerAuthSession();
  if (!user) return null;
  const units = await api.units.getUnitsBySubjectId({
    subjectId: user.currentSubjectId,
  });
  return (
    <div className="flex h-full w-[67%] justify-center pt-12">
      <div className="w-[40rem]">
        {units?.map((unit, unitIndex) => (
          <Unit key={unit.id} unitIndex={unitIndex + 1} {...unit} />
        ))}
      </div>
    </div>
  );
}
