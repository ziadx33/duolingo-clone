import { Lessons } from "@/components/learn/lessons/lessons";
import { QuestsSidebar } from "@/components/learn/quests-sidebar/quests-sidebar";
import { Sidebar } from "@/components/learn/sidebar/sidebar";

export default function Page() {
  return (
    <main className="flex h-screen w-full">
      <Sidebar />
      <Lessons />
      <QuestsSidebar />
    </main>
  );
}
