import type { Lesson, User } from "@prisma/client";

type GetXpData = {
  lessonData: Lesson;
  totalXp: User["totalXp"];
  current_xp: User["current_xp"];
  current_league_xp: User["current_league_xp"];
};

export function getXp({
  lessonData,
  totalXp,
  current_xp,
  current_league_xp,
}: GetXpData) {
  return {
    totalXp: totalXp + lessonData.xp,
    current_xp: current_xp + lessonData.xp,
    current_league_xp: current_league_xp + lessonData.xp,
  };
}
