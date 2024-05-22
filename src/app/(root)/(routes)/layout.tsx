import { QuestsSidebar } from "@/components/learn/quests-sidebar/quests-sidebar";
import { Sidebar } from "@/components/learn/sidebar/sidebar";
import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen w-full">
      <Sidebar />
      <div className="flex min-h-full w-[67%] justify-center pt-12">
        <div className="w-[40rem]">{children}</div>
      </div>
      <QuestsSidebar />
    </main>
  );
}
