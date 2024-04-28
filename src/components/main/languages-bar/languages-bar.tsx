import { api } from "@/trpc/server";
import { Language } from "./components/language";

export async function LanguagesBar() {
  const data = await api.subjects.getAll();
  return (
    <div className="flex h-20 w-full items-center justify-center border-t-2">
      {data?.map((language) => (
        <Language
          key={language.code}
          code={language.code}
          name={language.name}
        />
      ))}
    </div>
  );
}
