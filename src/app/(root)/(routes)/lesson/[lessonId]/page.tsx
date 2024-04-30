import { getLessonById } from "@/server/actions/lessons";

export default async function Page({
  params: { lessonId },
}: {
  params: { lessonId: string };
}) {
  const lesson = await getLessonById(lessonId);
  console.log(lesson);
  return <h1>Hi</h1>;
}
