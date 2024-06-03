import { LeaderboardUser } from "@/components/leaderboard/leaderboard-user";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { differenceInDays } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page() {
  const { user } = await getServerAuthSession();
  const league = await api.leagues.getLeague({
    id: user?.current_league_id ?? "",
  });
  const users = await api.leagues.getLeagueUsers({ id: league?.id ?? "" });
  if (!league || !users || !user) notFound();
  const daysUntilNextLeague =
    user.current_next_league_days -
    differenceInDays(user.current_league_started, new Date());
  return (
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
      <div className="flex h-full w-full flex-col overflow-y-auto">
        {[...users, ...users, ...users, ...users].map((user, index) => (
          <LeaderboardUser key={user.id} index={index + 1} {...user} />
        ))}
      </div>
    </div>
  );
}
