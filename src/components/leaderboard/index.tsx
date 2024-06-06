import { LeaderboardUser } from "@/components/leaderboard/leaderboard-user";
import { NextLeague } from "@/components/leaderboard/next-league";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { differenceInDays } from "date-fns";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

export default async function Leaderboard() {
  const userData = await getServerAuthSession();
  const user = userData?.user;
  const league = await api.leagues.getLeague({
    id: user?.current_league_id ?? "",
  });
  const users = await api.leagues.getLeagueUsers({ id: league?.id ?? "" });
  if (!league || !users || !user) notFound();
  const leaderboard = users.sort((a, b) =>
    a.current_league_xp > b.current_league_xp ? -1 : 1,
  );
  const daysUntilNextLeague =
    user.current_next_league_days -
    differenceInDays(new Date(), user.current_league_started);
  return (
    <>
      {daysUntilNextLeague === 0 && (
        <NextLeague
          userData={user}
          currentLeague={league}
          win={
            leaderboard.findIndex((leaderUser) => leaderUser.id === user.id) <
            league.top_won
          }
          lose={
            league.top_lose
              ? leaderboard.findIndex(
                  (leaderUser) => leaderUser.id === user.id,
                ) >
                users.length - league.top_lose
              : leaderboard.findIndex(
                  (leaderUser) => leaderUser.id === user.id,
                ) > league.top_won
          }
        />
      )}
      <div className="flex h-full flex-col pb-4">
        <div className="flex flex-col items-center">
          <Image
            draggable="false"
            width={100}
            height={100}
            src={league.img_src}
            alt={league.name}
            className="mb-4"
          />
          <h2 className="mb-1 text-2xl">{league.name} League</h2>
          <p className="mb-4 text-muted-foreground">
            Top {league.top_won} advance to the next league
          </p>
          <p className="w-full border-b pb-4 text-center font-bold">
            {daysUntilNextLeague} days
          </p>
        </div>
        <div className="flex h-full w-full flex-col overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar]:bg-primary-foreground">
          {users
            .sort((a, b) =>
              a.current_league_xp > b.current_league_xp ? -1 : 1,
            )
            .map((user, index) => (
              <Fragment key={user.id}>
                {index === league.top_won && (
                  <div className="my-2 flex h-12 items-center justify-center gap-6 text-lg  uppercase text-green-600">
                    <FaArrowAltCircleUp size={24} />
                    promotion zone
                    <FaArrowAltCircleUp size={24} />
                  </div>
                )}
                {league.top_lose &&
                  index === users.length - league.top_lose && (
                    <div className="my-2 flex h-12 items-center justify-center gap-6 text-lg  uppercase text-destructive">
                      <FaArrowAltCircleDown size={24} />
                      demotion zone
                      <FaArrowAltCircleDown size={24} />
                    </div>
                  )}
                <LeaderboardUser
                  key={user.id}
                  index={index + 1}
                  win={index < league.top_won}
                  lose={
                    league.top_lose
                      ? index + 1 > users.length - league.top_lose
                      : null
                  }
                  {...user}
                />
              </Fragment>
            ))}
        </div>
      </div>
    </>
  );
}
