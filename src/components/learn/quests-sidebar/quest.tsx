import { Progress } from "@/components/ui/progress";
import { type useSession } from "@/hooks/use-session";
import { type Quest as QuestType } from "@prisma/client";
import Image from "next/image";
import { useCallback } from "react";

type QuestProps = {
  questIndex: number;
  userData: ReturnType<typeof useSession>["data"] | null;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
} & QuestType;

export function Quest({ userData, costs, questIndex, price }: QuestProps) {
  const boxSrcs = [
    "/images/icons/brown-chest.svg",
    "/images/icons/gray-chest.svg",
    "/images/icons/golden-chest.svg",
  ];
  const progress = useCallback(() => {
    const current_xp = userData?.user?.current_xp ?? 0;

    return current_xp > costs ? 100 : (current_xp / costs) * 100;
  }, [costs, userData?.user]);
  console.log(boxSrcs[questIndex]);
  return (
    <div className="flex h-fit items-center gap-2">
      <Image width={40} height={40} alt="xp" src="/images/icons/gem.svg" />
      <div className=" h-full w-full">
        <h3 className="mb-2">Earn {price} gems</h3>
        <div className="relative flex items-center">
          <Progress value={progress()} />
          <Image
            className="absolute -right-2"
            src={boxSrcs[questIndex]!}
            alt="box"
            width={30}
            height={30}
          />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-primary-foreground">
            {(userData?.user?.current_xp ?? 0) > costs
              ? costs
              : userData?.user?.current_xp}
            /{costs}
          </span>
        </div>
      </div>
    </div>
  );
}
