import { useSession } from "@/hooks/use-session";
import ChooseSubjectSelect from "./header-buttons/choose-subject-select";
import { StreakButton } from "./header-buttons/streak-button";
import { GemButton } from "./header-buttons/gem-button";
import { HeartsButton } from "./header-buttons/hearts-button";
import { useEffect, useState } from "react";

export function useHooker() {
  const [firstRender, setFirstRender] = useState(false);
  useEffect(() => {
    if (firstRender) return;
    setFirstRender(true);
  }, [firstRender]);
  return firstRender;
}

export function Header() {
  const { data: userData } = useSession();
  return (
    <header className="flex items-center justify-center gap-8 py-3 pt-12 xl:h-24 xl:pr-4 xl:pt-4">
      <ChooseSubjectSelect {...userData?.user} />
      <StreakButton user={userData?.user} streak={userData?.user?.streak} />
      <GemButton gem={userData?.user?.gem} />
      <HeartsButton
        userId={userData?.user?.id}
        lastHeartIncrement={userData?.user?.lastHeartIncrement}
        hearts={userData?.user?.hearts}
      />
    </header>
  );
}
