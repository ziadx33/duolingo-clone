import Image from "next/image";
import { Card } from "../ui/card";
import { api } from "@/trpc/react";
import { RotatingLines } from "react-loader-spinner";
import { useSession } from "@/hooks/use-session";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { differenceInDays } from "date-fns";

type CongratsProps = {
  lessonId: string;
  setCompletedDoneReqs: Dispatch<SetStateAction<boolean>>;
};

export function Congrats({ lessonId, setCompletedDoneReqs }: CongratsProps) {
  const { data: lessonData, isLoading } = api.lessons.getLessonById.useQuery({
    id: lessonId,
  });
  const { update, data: userData } = useSession();
  const { mutateAsync: editUserFn } = api.auth.user.update.useMutation();
  const { data: lessons } = api.lessons.getLessonsByLessonId.useQuery({
    id: lessonId,
  });
  useEffect(() => {
    void (async () => {
      if (!userData?.user || !lessonData || !lessons) return;

      let data: Parameters<typeof editUserFn>["0"]["data"] = {
        streak: 0,
        last_streak: new Date(userData.user.last_streak),
        highest_streak: userData.user.highest_streak,
        freeze_streak: userData.user.freeze_streak,
      };

      const daysBetweenLastStreakAndNow = differenceInDays(
        new Date(),
        userData.user.last_streak,
      );
      console.log("works", daysBetweenLastStreakAndNow);
      console.log("streaking", userData.user.streak);

      if (userData.user.streak >= 1 && daysBetweenLastStreakAndNow === 0) {
        console.log("first condition");
        data.streak = userData.user.streak;
      } else if (
        daysBetweenLastStreakAndNow === 1 ||
        userData.user.streak === 0
      ) {
        data.streak = userData.user.streak + 1;
        data.last_streak = new Date();
        console.log("second condition");

        if (daysBetweenLastStreakAndNow >= 1) {
          console.log("third condition");
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          data.highest_streak = Math.max(
            data.streak,
            userData.user.highest_streak,
          );
        }
      } else if (
        daysBetweenLastStreakAndNow === 0 &&
        data.highest_streak === 0
      ) {
        data.streak = userData.user.streak;
        console.log("forth condition");
      }

      if (data.streak === 0 && userData.user.freeze_streak) {
        data = {
          ...data,
          streak: userData.user.streak,
          freeze_streak: false,
        };
      }

      const isAlreadyCompleted =
        userData.user.completedLessonIds.includes(lessonId);
      setCompletedDoneReqs(false);
      const newTotalXp = userData?.user?.totalXp + lessonData.xp;
      const current_xp = userData?.user?.current_xp + lessonData.xp;

      const defaultUpdatedData: Parameters<typeof editUserFn>["0"]["data"] = {
        ...data,
        gem: userData.user.gem,
        totalXp: newTotalXp,
        current_league_xp: userData.user.current_league_xp + lessonData.xp,
        current_xp,
      };

      if (!isAlreadyCompleted) {
        const newCompletedLessonIds = [
          ...userData.user?.completedLessonIds,
          lessonId,
        ];
        const newCompletedPracticeIds = [
          ...userData?.user.completedPracticeIds,
        ];
        const completedPracticeLessonsLength = lessons
          .filter((lesson) => newCompletedLessonIds.includes(lesson.id))
          .map((lesson) => lesson.id).length;
        if (completedPracticeLessonsLength === lessons.length) {
          newCompletedPracticeIds.push(lessonData.practiceId);
        }

        const updatedData: Parameters<typeof editUserFn>["0"]["data"] = {
          ...defaultUpdatedData,
          completedLessonIds: newCompletedLessonIds,
          completedPracticeIds: newCompletedPracticeIds,
        };
        await update(updatedData);
        await editUserFn({
          data: updatedData,
          id: userData?.user.id,
        });
        setCompletedDoneReqs(true);
        return;
      }
      await update(defaultUpdatedData);

      await editUserFn({
        data: defaultUpdatedData,
        id: userData?.user.id,
      });
      setCompletedDoneReqs(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonData, lessons]);

  if (isLoading) {
    return (
      <div className="mb-56 grid h-full w-[50rem] place-items-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="70"
          visible={true}
        />
      </div>
    );
  }
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
