import { Progress } from "@/components/ui/progress";
import { type User, type Quest as QuestType } from "@prisma/client";
import Image from "next/image";

type QuestProps = {
  questIndex: number;
  userData: User | undefined;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
} & QuestType;

export function Quest({ userData, costs, questIndex }: QuestProps) {
  console.log(costs);
  const boxSrcs = [
    "https://d35aaqx5ub95lt.cloudfront.net/images/goals/df7eda7cc1cc833ba30cd1e82781b68f.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/goals/9ec970f9fd7820abd758cb4cf805e73c.svg",
    "https://d35aaqx5ub95lt.cloudfront.net/images/goals/ca23da57929a3144934ee0571a2f44e9.svg",
  ];
  return (
    <div className="flex h-fit gap-2">
      <Image
        width={60}
        height={60}
        alt="xp"
        src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/2b5a211d830a24fab92e291d50f65d1d.svg"
      />
      <div className="h-full w-full">
        <h3 className="mb-2">Earn {costs} XP</h3>
        <div className="flex items-center">
          <Progress value={(userData?.current_xp ?? 0 / costs) * 100} />
          <Image src={boxSrcs[questIndex]!} alt="box" width={30} height={30} />
        </div>
      </div>
    </div>
  );
}
