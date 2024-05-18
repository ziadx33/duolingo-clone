import Image from "next/image";
import { Card } from "../ui/card";
import { api } from "@/trpc/react";
import { RotatingLines } from "react-loader-spinner";
import { useSession } from "@/hooks/use-session";
import { useEffect } from "react";

export function Congrats({ lessonId }: { lessonId: string }) {
  const { data: lessonData, isLoading } = api.lessons.getLessonById.useQuery({
    id: lessonId,
  });
  const { update, data: userData } = useSession();
  const { mutateAsync: editUserFn } = api.auth.user.update.useMutation();
  useEffect(() => {
    void (async () => {
      if (!userData?.user || !lessonData) return;
      const newTotalXp = userData?.user?.totalXp + lessonData?.xp ?? 0;
      const newCompletedLessonIds = [
        ...userData?.user.completedLessonIds,
        lessonId,
      ];
      const newCompletedPracticeIds = [...userData?.user.completedPracticeIds];
      if (newCompletedLessonIds.length === 3)
        newCompletedLessonIds.push(lessonData.practiceId);

      const updatedData = {
        totalXp: newTotalXp,
        completedLessonIds: newCompletedLessonIds,
        completedPracticeIds: newCompletedPracticeIds,
      };
      await update(updatedData);
      await editUserFn({
        data: updatedData,
        id: userData?.user.id,
      });
      console.log("done");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonData]);

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
