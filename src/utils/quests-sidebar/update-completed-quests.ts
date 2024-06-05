import { type User } from "@prisma/client";
import { differenceInDays } from "date-fns";

type updateXPParams = {
  last_xp_increment: User["last_xp_increment"];
  init: User["completed_quests_ids"];
};

export function updateCompletedQuests({
  last_xp_increment,
  init,
}: updateXPParams) {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  let new_completed_quests_ids: User["completed_quests_ids"] = init;

  const daysBetweenLastStreakAndNow = differenceInDays(
    last_xp_increment,
    new Date(),
  );
  if (daysBetweenLastStreakAndNow < 0) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    new_completed_quests_ids = [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return new_completed_quests_ids;
}
