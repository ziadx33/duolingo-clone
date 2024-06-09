import { type User } from "@prisma/client";
import { Card } from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LeaderboardUserProps = {
  index: number;
  win: boolean;
  lose: boolean | null;
} & User;

const LEADERBORD_TOP = [
  "https://d35aaqx5ub95lt.cloudfront.net/images/leagues/9e4f18c0bc42c7508d5fa5b18346af11.svg",
  "https://d35aaqx5ub95lt.cloudfront.net/images/leagues/cc7b8f8582e9cfb88408ab851ec2e9bd.svg",
  "https://d35aaqx5ub95lt.cloudfront.net/images/leagues/eef523c872b71178ef5acb2442d453a2.svg",
];

export function LeaderboardUser({
  name,
  index,
  image,
  current_league_xp,
  win,
  lose,
}: LeaderboardUserProps) {
  return (
    <Card
      className={cn(
        "flex h-16 w-full items-center justify-between border-none px-6 py-2 pl-7 transition-colors hover:bg-muted ",
        index <= 3 && "pl-4",
        index === 1 && "rounded-t-none",
      )}
    >
      <div className="flex items-center">
        {index < 4 ? (
          <Image
            src={LEADERBORD_TOP[index - 1] ?? ""}
            width={40}
            height={40}
            className="mb-1 mr-2"
            alt={name ?? ""}
          />
        ) : (
          <span
            className={cn(
              "flex h-full w-9 items-center text-xl",
              win ? "text-green-600" : lose ? "text-destructive" : "",
            )}
          >
            {index}
          </span>
        )}
        <Image
          src={image ?? ""}
          width={45}
          height={45}
          className="mr-2.5 h-[45px] w-[45px] rounded-full object-cover"
          alt={name ?? ""}
        />
        <h3 className="text-md">{name}</h3>
      </div>
      <h3>{current_league_xp} XP</h3>
    </Card>
  );
}
