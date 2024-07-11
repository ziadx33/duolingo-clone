import { Achievements } from "@/components/profile/achievements";
import { StatsBox } from "@/components/profile/stats-box";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaPen } from "react-icons/fa";

export default async function Page() {
  const userData = await getServerAuthSession();
  const session = userData?.user;
  const currentLeague = await api.leagues.getLeague({
    id: session?.current_league_id ?? "",
  });
  return (
    <div className="flex flex-col gap-3 px-4 pt-4 xl:px-0 xl:pt-0">
      <div className="flex gap-6">
        <div className="relative h-36 w-36">
          <Image
            src={session?.image ?? ""}
            fill
            alt="profile pic"
            className="rounded-full object-cover"
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 rounded-full"
            asChild
          >
            <Link href="/profile/edit">
              <FaPen />
            </Link>
          </Button>
        </div>
        <div className="flex h-fit flex-col justify-between gap-1">
          <h1 className="text-3xl">{session?.name}</h1>
          <p className="text-muted-foreground">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */}
            Joined {format(new Date(session?.created_at ?? ""), "MMM YYY")}
          </p>
        </div>
      </div>
      <Separator className="mb-2" />
      <h1 className="text-3xl">Statistics</h1>
      <div className="mb-2 grid grid-cols-2 gap-3">
        <StatsBox
          caption={session?.streak}
          description="Day streak"
          image="/images/icons/streak.svg"
        />
        <StatsBox
          caption={session?.totalXp}
          description="Total XP"
          image="/images/icons/xp.svg"
        />
        <StatsBox
          caption={currentLeague?.name}
          description="current league"
          image={currentLeague?.img_src ?? ""}
        />
      </div>
      <h1 className="text-3xl">Achievements</h1>
      <div className="flex h-fit w-full flex-col overflow-hidden rounded-lg border">
        <Achievements />
      </div>
    </div>
  );
}
