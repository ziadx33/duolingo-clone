"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { Quest } from "./quest";
import { useSession } from "@/hooks/use-session";
import { RotatingLines } from "react-loader-spinner";
import { useEffect, useRef } from "react";
import { type User } from "@prisma/client";
import { getCompletedQuests, getUpdatedXp } from "@/utils/quests";
import { useUpdateUser } from "@/hooks/use-update-user";

export function Quests({
  className,
  sidebar = true,
}: {
  className?: string;
  sidebar?: boolean;
}) {
  const { isLoading, data: quests } = api.quests.getQuests.useQuery();
  api.auth.user.update.useMutation();
  const { data: session } = useSession();
  const { update: updateUser } = useUpdateUser();
  const updated = useRef(false);
  const completedReqs = useRef(false);

  useEffect(() => {
    void (async () => {
      if (!sidebar) return;
      if (completedReqs.current) return;
      if (isLoading) return;
      if (session?.user) updated.current = true;
      if (!updated.current) return;

      const nonNullableSession = session?.user as unknown as User;

      const updatedXpData = getUpdatedXp(nonNullableSession);
      const updatedQuestsData = getCompletedQuests({
        session: nonNullableSession as unknown as User,
        quests: quests ?? [],
        completedQuestsIds:
          updatedXpData?.completed_quests_ids ??
          nonNullableSession.completed_quests_ids,
      });
      const updatedData = {
        ...updatedXpData,
        ...updatedQuestsData,
        gem: nonNullableSession.gem + (updatedQuestsData?.gem ?? 0),
      };
      completedReqs.current = true;
      await updateUser({
        data: updatedData,
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, isLoading]);

  return (
    <Card className={className}>
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
