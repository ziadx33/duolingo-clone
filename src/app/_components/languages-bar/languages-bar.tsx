import { Language } from "./components/language";

export function LanguagesBar() {
  return (
    <div className="flex h-20 w-full items-center justify-center border-t-2">
      <Language code="ar" name="Arabic" />
    </div>
  );
}
