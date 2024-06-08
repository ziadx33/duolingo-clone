"use client";

import { useEffect } from "react";
import { type League } from "@prisma/client";
import { api } from "@/trpc/react";
import { type useSession } from "@/hooks/use-session";
import { Loading } from "../loading";
import { useUpdateUser } from "@/hooks/use-update-user";

type NextLeagueProps = {
  currentLeague: League;
  win: boolean;
  lose: boolean;
};

export function NextLeague({ currentLeague, win, lose }: NextLeagueProps) {
  const { isLoading, data: leagues } = api.leagues.getLeagues.useQuery();
  const { update: updateUser } = useUpdateUser();
  useEffect(() => {
    void (async () => {
      if (isLoading) return;
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
        void updateUser({ data: updateData }).then(
          () => (location.pathname = "/leaderboard"),
        );
        if (prevLeague.id === currentLeague.id)
          location.pathname = "/leaderboard";
      }
      if (!win) return;
      const nextLeague =
        leagues?.find((league) => league.level === currentLeague.level + 1) ??
        currentLeague;
      const updateData: Parameters<typeof updateUser>["0"]["data"] = {
        ...defaultUpdateData,
        current_league_id: nextLeague.id,
      };
      void updateUser({ data: updateData }).then(
        () => (location.pathname = "/leaderboard"),
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return <Loading />;
}
