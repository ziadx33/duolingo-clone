import { Progress } from "@/components/ui/progress";
import { useSession } from "@/hooks/use-session";
import { api } from "@/trpc/react";
import { double } from "@/utils/quests-sidebar/double";
import { updateCompletedQuests } from "@/utils/quests-sidebar/update-completed-quests";
import { type Quest as QuestType } from "@prisma/client";
import { differenceInDays } from "date-fns";
import Image from "next/image";
import { useCallback, useEffect } from "react";

type QuestProps = {
  questIndex: number;
  userData: ReturnType<typeof useSession>["data"] | null;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
} & QuestType;

export function Quest({ userData, costs, questIndex, price, id }: QuestProps) {
  const boxSrcs = [
    "https://d35aaqx5ub95lt.cloudfront.net/images/goals/df7eda7cc1cc833ba30cd1e82781b68f.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/goals/9ec970f9fd7820abd758cb4cf805e73c.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/goals/ca23da57929a3144934ee0571a2f44e9.svg",
  ];
  const { update: updateSession } = useSession();
  const progress = useCallback(() => {
    const current_xp = userData?.user?.current_xp ?? 0;
    const differenceBetweenTodayAndLastIncrement = differenceInDays(
      userData?.user?.last_xp_increment ?? new Date(),
      new Date(),
    );
    return differenceBetweenTodayAndLastIncrement === 1
      ? 0
      : current_xp > costs
        ? 100
        : (current_xp / costs) * 100;
  }, [costs, userData?.user?.current_xp, userData?.user?.last_xp_increment]);

  const { mutateAsync: updateUser } = api.auth.user.update.useMutation();

  useEffect(() => {
    void (async () => {
      if (!userData?.user) return;
      const new_completed_quests_ids = updateCompletedQuests({
        last_xp_increment: userData.user.last_xp_increment,
        init: userData.user.completed_quests_ids,
      });
      if (new_completed_quests_ids.includes(id)) return;
      if (userData.user.current_xp < costs) return;
      const { double_or_nothing, doubledPrice } = double({
        double: userData.user.double_or_nothing,
        price,
        streak: userData.user.streak,
      });
      console.log("doubled", doubledPrice);
      const updated_data: Parameters<typeof updateUser>["0"]["data"] = {
        completed_quests_ids: [...new_completed_quests_ids, id],
        gem: userData.user.gem + doubledPrice,
        double_or_nothing,
      };
      console.log("updated_data", updated_data);
      void updateUser({
        id: userData.user.id,
        data: updated_data,
      });
      void updateSession(updated_data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
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
            {(userData?.user?.current_xp ?? 0) > costs
              ? costs
              : userData?.user?.current_xp}
            /{costs}
          </span>
        </div>
      </div>
    </div>
  );
}
