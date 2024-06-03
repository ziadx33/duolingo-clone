"use client";

import { useEffect } from "react";
import { type User, type League } from "@prisma/client";
import { RotatingLines } from "react-loader-spinner";
import { api } from "@/trpc/react";
import { useSession } from "@/hooks/use-session";

type NextLeagueProps = {
  currentLeague: League;
  win: boolean;
  lose: boolean;
  userData: User;
};

export function NextLeague({
  currentLeague,
  win,
  lose,
  userData,
}: NextLeagueProps) {
  const { update: updateSession } = useSession();
  const { isLoading, data: leagues } = api.leagues.getLeagues.useQuery();
  const { mutateAsync: updateUser } = api.auth.user.update.useMutation();
  console.log("started");
  useEffect(() => {
    void (async () => {
      if (isLoading) return;
      console.log("started 2");
      type UpdateParams = Parameters<
        ReturnType<typeof useSession>["update"]
      >["0"];
      const defaultUpdateData: UpdateParams = {
        current_league_xp: 0,
        current_league_started: new Date(),
      };
      if (lose) {
        const prevLeague =
          leagues?.find((league) => league.level === currentLeague.level - 1) ??
          currentLeague;
        const updateData: Parameters<typeof updateUser>["0"]["data"] = {
          ...defaultUpdateData,
          current_league_id: prevLeague.id,
        };
        void updateUser({ id: userData.id, data: updateData }).then(
          () => (location.pathname = "/leaderboard"),
        );
        await updateSession(updateData as UpdateParams);
        if (prevLeague.id === currentLeague.id)
          location.pathname = "/leaderboard";
      }
      if (win) {
        const nextLeague =
          leagues?.find((league) => league.level === currentLeague.level + 1) ??
          currentLeague;
        const updateData: Parameters<typeof updateUser>["0"]["data"] = {
          ...defaultUpdateData,
          current_league_id: nextLeague.id,
        };
        void updateUser({ id: userData.id, data: updateData }).then(
          () => (location.pathname = "/leaderboard"),
        );
        await updateSession(updateData as UpdateParams);
        if (nextLeague.id === currentLeague.id) {
          location.pathname = "/leaderboard";
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return <Loading />;
}

function Loading() {
  return (
    <div className="grid h-full w-full place-items-center pb-12">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="70"
        visible={true}
      />
    </div>
  );
}
