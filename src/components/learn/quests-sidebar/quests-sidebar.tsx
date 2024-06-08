"use client";

import { Header } from "./header";
import { Quests } from "./quests";
import { useIsMobile } from "@/hooks/use-is-mobile";

export function QuestsSidebar() {
  const isMobile = useIsMobile(1280);
  return (
    <aside className="mr-4 flex h-full w-full flex-col gap-4 xl:w-[20%]">
      <Header />
      {!isMobile && <Quests />}
    </aside>
  );
}
