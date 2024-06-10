import { type User } from "@prisma/client";
import Image from "next/image";

export function StreakButton({
  streak,
}: {
  streak: User["streak"] | undefined;
}) {
  return (
    <div className="flex h-fit items-center gap-1.5 text-orange-500">
      <Image
        src={`/images/icons/streak.svg`}
        width={25}
        height={30}
        alt="streak"
      />
      {streak ?? 0 > 0 ? streak : null}
    </div>
  );
}
