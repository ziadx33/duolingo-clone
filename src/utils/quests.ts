import { type Quest, type User } from "@prisma/client";
import { updateCompletedQuests } from "./quests-sidebar/update-completed-quests";
import { double } from "./quests-sidebar/double";
import { updateXP } from "./quests-sidebar/update-xp";

export const getCompletedQuests = ({
  session,
  quests,
  completedQuestsIds,
}: {
  session: User;
  quests: Quest[];
  completedQuestsIds: string[];
}) => {
  const questsVal = quests
    ?.map(({ id, price, costs }) => {
      const new_completed_quests_ids = updateCompletedQuests({
        last_xp_increment: session.last_xp_increment,
        init: completedQuestsIds,
      });
      if (new_completed_quests_ids.includes(id)) {
        return { id, done: false };
      }
      console.log(id, costs, session.current_xp, "shoulder");
      if (session.current_xp < costs) {
        return { id, done: false };
      }
      const { double_or_nothing, doubledPrice } = double({
        double: session.double_or_nothing,
        price,
        streak: session.streak,
      });
      return { id, double_or_nothing, price: doubledPrice, done: true };
    })
    .filter((el) => el.done);
  const completed_quests_ids = questsVal.map((quest) => quest.id);
  const gem = questsVal
    .map((quest) => quest.price)
    .reduce((a, b) => {
      if (!a || !b) return a;
      return a + b;
    }, 0);
  const double_or_nothing = questsVal.some((quest) => quest.double_or_nothing);
  return { completed_quests_ids, gem, double_or_nothing };
};

export const getUpdatedXp = (session: User) => {
  const new_xp = updateXP({
    current_xp: session.current_xp,
    last_xp_increment: session.last_xp_increment,
  });
  if (new_xp !== 0) return;
  const updateData = {
    current_xp: new_xp,
    completed_quests_ids: new_xp === 0 ? [] : session.completed_quests_ids,
    last_xp_increment: new Date(),
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return updateData;
};
