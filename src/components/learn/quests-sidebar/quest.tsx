import { Progress } from "@/components/ui/progress";
import { useSession } from "@/hooks/use-session";
import { api } from "@/trpc/react";
import { updateCompletedQuests } from "@/utils/quests-sidebar/update-completed-quests";
import { type User, type Quest as QuestType } from "@prisma/client";
import Image from "next/image";
import { useCallback, useEffect } from "react";

type QuestProps = {
  questIndex: number;
  userData: User | undefined;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
} & QuestType;

export function Quest({ userData, costs, questIndex, price, id }: QuestProps) {
  const boxSrcs = [
    "https://d35aaqx5ub95lt.cloudfront.net/images/goals/df7eda7cc1cc833ba30cd1e82781b68f.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/goals/9ec970f9fd7820abd758cb4cf805e73c.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/goals/ca23da57929a3144934ee0571a2f44e9.svg",
  ];
  const progress = useCallback(() => {
    const current_xp = userData?.current_xp ?? 0;
    return current_xp > costs ? 100 : (current_xp / costs) * 100;
  }, [costs, userData?.current_xp]);

  const { mutateAsync: updateUser } = api.auth.user.update.useMutation();
  const { update: updateSession } = useSession();

  useEffect(() => {
    void (async () => {
      if (userData === undefined) return;
      if (userData.completed_quests_ids.includes(id)) return;
      if (userData.current_xp < costs) return;
      const new_completed_quests_ids = updateCompletedQuests({
        last_xp_increment: userData.last_xp_increment,
        init: [...userData.completed_quests_ids, id],
      });
      const updated_data = {
        completed_quests_ids: new_completed_quests_ids,
        gem: userData.gem + price,
      };
      void updateUser({
        id: userData.id,
        data: updated_data,
      });
      void updateSession(updated_data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  console.log("data", userData);
  return (
    <div className="flex h-fit items-center gap-2">
      <Image width={40} height={40} alt="xp" src="/images/icons/gem.svg" />
      <div className=" h-full w-full">
        <h3 className="mb-2">Earn {price} gems</h3>
        <div className="relative flex items-center">
          <Progress value={progress()} />
          <Image
            className="absolute -right-2"
            src={boxSrcs[questIndex]!}
            alt="box"
            width={30}
            height={30}
          />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-primary-foreground">
            {(userData?.current_xp ?? 0) > costs ? costs : userData?.current_xp}
            /{costs}
          </span>
        </div>
      </div>
    </div>
  );
}
