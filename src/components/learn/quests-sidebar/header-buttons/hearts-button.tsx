import { useSession } from "@/hooks/use-session";
import { api } from "@/trpc/react";
import { type User } from "@prisma/client";
import Image from "next/image";
import { useEffect } from "react";

const timeIncrement = 30;
const maxHearts = 5;

export function HeartsButton({
  hearts,
  lastHeartIncrement,
  userId,
}: {
  hearts: User["hearts"] | undefined;
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  lastHeartIncrement: User["lastHeartIncrement"] | undefined;
  userId: User["id"] | undefined;
}) {
  const { update: updateUserJWT } = useSession();
  const { mutateAsync: updateUser } = api.auth.user.update.useMutation();
  useEffect(() => {
    if (!lastHeartIncrement || !userId) return;
    const now = new Date();
    const minutesSinceLastIncrement = Math.floor(
      (now.getTime() -
        new Date(lastHeartIncrement as unknown as string).getTime()) /
        60000,
    );
    const increments = Math.floor(minutesSinceLastIncrement / timeIncrement);

    if (increments > 0) {
      const newHearts = Math.min(hearts! + increments, maxHearts);
      const updateData = { hearts: newHearts, lastHeartIncrement: now };
      void updateUser({
        data: updateData,
        id: userId,
      });
      void updateUserJWT(updateData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastHeartIncrement, userId]);
  return (
    <div className="flex h-fit items-center gap-1.5 text-red-600">
      <Image
        src={`/images/icons/heart.svg`}
        width={30}
        height={30}
        alt="hearts"
      />
      {hearts}
    </div>
  );
}
