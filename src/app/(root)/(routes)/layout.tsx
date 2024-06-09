import { QuestsSidebar } from "@/components/learn/quests-sidebar/quests-sidebar";
import { Sidebar } from "@/components/learn/sidebar/sidebar";
import { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen w-full flex-col-reverse xl:flex-row">
      <Sidebar />
      <div className="flex h-[80%] w-full justify-center xl:w-[67%] xl:pt-12">
        <div className="h-full w-full xl:w-[40rem]">{children}</div>
      </div>
      <QuestsSidebar />
    </main>
  );
}
