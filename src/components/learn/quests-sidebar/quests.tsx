import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";
import { Quest } from "./quest";
import { getServerSession } from "next-auth";

export async function Quests() {
  const quests = await api.quests.getQuests();
  const data = await getServerSession();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Quests</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {quests
          .sort((a, b) => (b.costs > a.costs ? -1 : 1))
          .map((quest, questIndex) => (
            <Quest
              userData={data?.user}
              key={quest.id}
              questIndex={questIndex}
              {...quest}
            />
          ))}
      </CardContent>
    </Card>
  );
}
