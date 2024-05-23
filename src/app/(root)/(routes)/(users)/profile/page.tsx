import { StatsBox } from "@/components/profile/stats-box";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";
import { format } from "date-fns";
import Image from "next/image";

export default async function Page() {
  const { user: session } = await getServerAuthSession();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-6">
        <Image
          src={session?.image ?? ""}
          width={150}
          height={150}
          alt="profile pic"
          className="rounded-full"
        />
        <div className="flex h-fit flex-col justify-between gap-1">
          <h1 className="text-3xl">{session?.name}</h1>
          <p className="text-muted-foreground">
            Joined {format(new Date(session?.created_at ?? ""), "MMM YYY")}
          </p>
        </div>
      </div>
      <Separator className="mb-2" />
      <h1 className="text-3xl">Statistics</h1>
      <div className="grid grid-cols-2 gap-3">
        <StatsBox
          caption={session?.streak}
          description="Day streak"
          image="/images/icons/streak.svg"
        />
        <StatsBox
          caption={session?.totalXp}
          description="Total XP"
          image="https://d35aaqx5ub95lt.cloudfront.net/images/profile/01ce3a817dd01842581c3d18debcbc46.svg"
        />
      </div>
    </div>
  );
}
