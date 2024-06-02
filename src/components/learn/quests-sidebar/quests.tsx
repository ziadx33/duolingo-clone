"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Quest } from "./quest";
import { useSession } from "@/hooks/use-session";
import { RotatingLines } from "react-loader-spinner";
import { useEffect } from "react";
import { updateXP } from "@/utils/quests-sidebar/update-xp";

export function Quests() {
  const { isLoading, data: quests } = api.quests.getQuests.useQuery();
  const { mutateAsync: updateUser } = api.auth.user.update.useMutation();
  const { data: session, update: updateSession } = useSession();

  useEffect(() => {
    void (async () => {
      if (!session?.user) return;
      const new_xp = updateXP({
        current_xp: session.user.current_xp,
        last_xp_increment: session.user.last_xp_increment,
      });
      if (new_xp !== 0) return;
      const updateData = {
        current_xp: new_xp,
        completed_quests_ids:
          new_xp === 0 ? [] : session.user.completed_quests_ids,
        last_xp_increment: new Date(),
      };
      void updateUser({
        data: updateData,
        id: session.user.id,
      });
      void updateSession(updateData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Quests</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pl-3.5">
        {!isLoading ? (
          quests
            ?.sort((a, b) => (b.costs > a.costs ? -1 : 1))
            .map((quest, questIndex) => (
              <Quest
                userData={session}
                key={quest.id}
                questIndex={questIndex}
                {...quest}
              />
            ))
        ) : (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="70"
            visible={true}
          />
        )}
      </CardContent>
    </Card>
  );
}
