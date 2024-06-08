import Image from "next/image";
import { Card } from "../ui/card";
import { api } from "@/trpc/react";
import { useSession } from "@/hooks/use-session";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { getStreak } from "@/utils/congrats/get-streak";
import { getCompletedLessons } from "@/utils/congrats/get-completed-lessons";
import { getXp } from "@/utils/congrats/get-xp";
import { Loading } from "../loading";
import { useUpdateUser } from "@/hooks/use-update-user";
import { type User } from "@prisma/client";
import { useRouter } from "next/navigation";

type CongratsProps = {
  lessonId: string;
  setCompletedDoneReqs: Dispatch<SetStateAction<boolean>>;
};

export function Congrats({ lessonId, setCompletedDoneReqs }: CongratsProps) {
  const { data: lessonData, isLoading } = api.lessons.getLessonById.useQuery({
    id: lessonId,
  });
  const { data: userData } = useSession();
  const { data: lessons } = api.lessons.getLessonsByLessonId.useQuery({
    id: lessonId,
  });
  const { update: updateUser } = useUpdateUser();
  const router = useRouter();
  useEffect(() => {
    const changeUserData = async () => {
      if (!userData?.user || !lessonData || !lessons) return;

      setCompletedDoneReqs(false);

      const defaultUpdatedData: Partial<User> = {
        ...getStreak(userData.user),
        ...getXp({ ...userData.user, lessonData }),
      };

      const isAlreadyCompleted =
        userData.user.completedLessonIds.includes(lessonId);

      const postData = async (user: User) => {
        if (!isAlreadyCompleted) {
          const completedLessonsData = getCompletedLessons({
            lessonId,
            lessonData,
            lessons,
            ...user,
          });

          await updateUser({
            data: {
              ...defaultUpdatedData,
              ...completedLessonsData,
            },
          });
        } else await updateUser({ data: defaultUpdatedData });
      };

      await postData(userData.user);
      router.refresh();

      setCompletedDoneReqs(true);
    };

    void changeUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonData, lessons]);

  if (isLoading) return <Loading />;
  return (
    <div className="-mt-24 flex h-full w-full flex-col items-center gap-4">
      <Image
        src="/images/questions/congrats.svg"
        width={500}
        height={500}
        alt="congrats"
        draggable={false}
      />
      <Card className="pt-2 text-center text-xl">
        <h3 className="border-b pb-2">Total xp</h3>
        <div className="flex h-16 w-fit items-center gap-2 px-12 text-lg">
          <Image
            src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/f5358b2d4087a109790fc809eedc08c5.svg"
            width={20}
            height={20}
            alt="xp"
          />
          {lessonData?.xp}
        </div>
      </Card>
    </div>
  );
}
