import { Questions } from "@/components/[lessonId]/questions";
import { api } from "@/trpc/server";

export default async function Page({
  params: { lessonId },
}: {
  params: { lessonId: string };
}) {
  const questionTypes =
    (await api.questionTypes.getQuestionTypesByLessonId({
      lessonId,
    })) ?? [];
  return <Questions questionTypes={questionTypes} />;
}
