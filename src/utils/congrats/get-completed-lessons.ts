import { type Lesson, type User } from "@prisma/client";

type GetCompletedLessons = {
  lessonId: Lesson["id"];
  completedLessonIds: User["completedLessonIds"];
  completedPracticeIds: User["completedPracticeIds"];
  lessons: Lesson[];
  lessonData: Lesson;
};

export function getCompletedLessons({
  completedLessonIds,
  completedPracticeIds,
  lessonId,
  lessons,
  lessonData,
}: GetCompletedLessons) {
  let data = {
    completedLessonIds: [...completedLessonIds, lessonId],
    completedPracticeIds: [...completedPracticeIds],
  };

  const completedPracticeLessonsLength = lessons
    .filter((lesson) => data.completedLessonIds.includes(lesson.id))
    .map((lesson) => lesson.id).length;
  if (completedPracticeLessonsLength === lessons.length) {
    data = {
      ...data,
      completedPracticeIds: [
        ...data.completedPracticeIds,
        lessonData.practiceId,
      ],
    };
  }
  return data;
}
