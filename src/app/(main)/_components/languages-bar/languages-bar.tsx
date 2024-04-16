import { api } from "@/trpc/server";
import { Language } from "./components/language";

export async function LanguagesBar() {
  const availableLanguages = await api.subjects.getAll();
  return (
    <div className="flex h-20 w-full items-center justify-center border-t-2">
      {availableLanguages.map((language) => (
        <Language
          key={language.code}
          code={language.code}
          name={language.name}
        />
      ))}
    </div>
  );
}
