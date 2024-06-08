import { Header } from "./header";
import { Quests } from "./quests";

export async function QuestsSidebar() {
  return (
    <aside className="mr-4 flex w-[20%] flex-col gap-4">
      <Header />
      <Quests />
    </aside>
  );
}
