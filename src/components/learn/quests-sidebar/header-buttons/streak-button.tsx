import { useUpdateUser } from "@/hooks/use-update-user";
import { getStreak } from "@/utils/congrats/get-streak";
import { type User } from "@prisma/client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function StreakButton({
  streak,
  user,
}: {
  streak: User["streak"] | undefined;
  user?: User;
}) {
  const isStreakChecked = useRef(false);
  const { update: updateUser } = useUpdateUser();
  useEffect(() => {
    const checkStreak = async () => {
      if (!user) return;
      if (isStreakChecked.current) return;
      const { streak } = getStreak(user);
      if (streak !== user.streak) void updateUser({ data: { streak } });
      isStreakChecked.current = true;
    };

    void checkStreak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="flex h-fit items-center gap-1.5 text-orange-500">
      <Image
        src={`/images/icons/streak.svg`}
        width={25}
        height={30}
        alt="streak"
      />
      {streak ?? 0 > 0 ? streak : null}
    </div>
  );
}
