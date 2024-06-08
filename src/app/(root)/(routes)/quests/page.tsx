import { Quests } from "@/components/learn/quests-sidebar/quests";

export default function Page() {
  return (
    <div className="grid h-full w-full place-items-center px-4">
      <Quests className="w-full max-w-96" sidebar={false} />
    </div>
  );
}
