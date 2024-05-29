import { api } from "@/trpc/server";
import { Achievement } from "./achievement";

export async function Achievements() {
  const achievements = await api.achievements.getAchievements();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (
    achievements.map((achievement, achievementIndex) => (
      <Achievement
        isBottomBorder={achievementIndex !== achievements.length - 1}
        key={achievement.id}
        {...achievement}
      />
    )) ?? null
  );
}
