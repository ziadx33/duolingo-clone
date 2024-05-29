"use client";

import { type Achievement as AchievementType } from "@prisma/client";
import { Card } from "../ui/card";
import Image from "next/image";
import { useCallback } from "react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

type AchieventProps = {
  isBottomBorder: boolean;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
} & AchievementType;

export function Achievement({
  imgSrc,
  name,
  isBottomBorder,
  type,
}: AchieventProps) {
  type achievementStatsReturnType = {
    level: number;
    currentLevelTotal: number;
    currentUserLevelTotal: number;
  };
  const achievementStats = useCallback<() => achievementStatsReturnType>(() => {
    return {
      level: 10,
      currentLevelTotal: 250,
      currentUserLevelTotal: 150,
    };
  }, []);
  const achievementStatsData = achievementStats();
  return (
    <div
      className={cn(
        "flex h-32 items-center gap-6 px-4 py-2 pr-6",
        isBottomBorder ? "border-b" : "",
      )}
    >
      <Card className="flex h-[85%] w-[77px] flex-col items-center justify-center gap-2.5 rounded-2xl border-none bg-muted px-4">
        <Image width={35} height={35} alt={name} src={imgSrc} />
        <p className="whitespace-nowrap text-xs">
          level {achievementStatsData.level}
        </p>
      </Card>
      <div className="flex h-full w-full flex-col gap-2 py-3">
        <div className="mb-3 flex w-full justify-between">
          <h3>{name}</h3>
          <p className="text-muted-foreground">
            {achievementStatsData.currentUserLevelTotal}/
            {achievementStatsData.currentLevelTotal}
          </p>
        </div>
        <Progress
          value={
            (achievementStatsData.currentUserLevelTotal /
              achievementStatsData.currentLevelTotal) *
            100
          }
        />
        <p>{`${type === "STREAK" ? "Reach a" : `Earn `} ${achievementStatsData.currentLevelTotal} ${type === "STREAK" ? "day streak" : "XP"}`}</p>
      </div>
    </div>
  );
}
