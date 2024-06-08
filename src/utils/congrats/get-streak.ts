import { type User } from "@prisma/client";
import { differenceInDays } from "date-fns";

type GetStreakParams = {
  last_streak: User["last_streak"];
  streak: User["streak"];
  freeze_streak: User["freeze_streak"];
  highest_streak: User["highest_streak"];
};

export function getStreak({
  last_streak,
  highest_streak,
  freeze_streak,
  streak,
}: GetStreakParams) {
  let data = {
    streak: 1,
    last_streak: new Date(last_streak),
    highest_streak: highest_streak,
    freeze_streak: freeze_streak,
  };

  const daysBetweenLastStreakAndNow = differenceInDays(new Date(), last_streak);

  if (streak >= 1 && daysBetweenLastStreakAndNow === 0) {
    data.streak = streak;
  } else if (daysBetweenLastStreakAndNow === 1 || streak === 0) {
    data.streak = streak + 1;
    data.last_streak = new Date();

    if (daysBetweenLastStreakAndNow >= 1) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      data.highest_streak = Math.max(data.streak, highest_streak);
    }
  } else if (daysBetweenLastStreakAndNow === 0 && data.highest_streak === 0) {
    data.streak = streak;
  }

  if (data.streak === 0 && freeze_streak) {
    data = {
      ...data,
      streak: streak,
      freeze_streak: false,
    };
  }

  return data;
}
