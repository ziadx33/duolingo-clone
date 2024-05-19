"use client";

import { useSession } from "@/hooks/use-session";
import ChooseSubjectSelect from "./header-buttons/choose-subject-select";
import { StreakButton } from "./header-buttons/streak-button";
import { GemButton } from "./header-buttons/gem-button";
import { HeartsButton } from "./header-buttons/hearts-button";

export function Header() {
  const { data: userData } = useSession();
  return (
    <header className="flex h-24 w-full items-center justify-center gap-8 py-3">
      <ChooseSubjectSelect {...userData?.user} />
      <StreakButton streak={userData?.user?.streak} />
      <GemButton gem={userData?.user?.gem} />
      <HeartsButton
        userId={userData?.user?.id}
        lastHeartIncrement={userData?.user?.lastHeartIncrement}
        hearts={userData?.user?.hearts}
      />
    </header>
  );
}
