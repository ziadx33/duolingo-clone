import { Header } from "@/components/header";
import { api } from "@/trpc/server";
import { Subject } from "@/components/choose-subjects/subject";

export default async function ChooseSubjects() {
  const subjects = await api.subjects.getAll();
  return (
    <main>
      <Header />
      <div className="container mx-auto w-[50rem] pt-16">
        <h1 className="mb-12 text-center text-3xl">I want to learn...</h1>
        <div className="flex h-fit w-full flex-wrap justify-center gap-2">
          {subjects.map((subject) => (
            <Subject key={subject.id} {...subject} />
          ))}
        </div>
      </div>
    </main>
  );
}
