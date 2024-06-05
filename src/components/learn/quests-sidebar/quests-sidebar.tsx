import { getServerAuthSession } from "@/server/auth";
import { Header } from "./header";
import { Quests } from "./quests";
import { SuperBox } from "./super-box";

export async function QuestsSidebar() {
  const userData = await getServerAuthSession();
  return (
    <aside className="mr-4 flex w-[20%] flex-col gap-4">
      <Header />
      {!userData?.user.is_super && <SuperBox />}
      <Quests />
    </aside>
  );
}
