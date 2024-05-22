import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Unit } from "./units/unit";

export async function Lessons() {
  const { user } = await getServerAuthSession();
  if (!user) return null;
  const units = await api.units.getUnitsBySubjectId({
    subjectId: user.currentSubjectId,
  });
  return units?.map((unit, unitIndex) => (
    <Unit key={unit.id} unitIndex={unitIndex + 1} {...unit} />
  ));
}
