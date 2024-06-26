import { type User } from "@prisma/client";
import { differenceInDays } from "date-fns";

type updateXPParams = {
  current_xp: User["current_xp"];
  last_xp_increment: User["last_xp_increment"];
};

export function updateXP({ current_xp, last_xp_increment }: updateXPParams) {
  let new_current_xp = current_xp;

  const daysBetweenLastXpIncrementAndNow = differenceInDays(
    last_xp_increment,
    new Date(),
  );

  if (daysBetweenLastXpIncrementAndNow < 0) {
    new_current_xp = 0;
  }

  return new_current_xp;
}
