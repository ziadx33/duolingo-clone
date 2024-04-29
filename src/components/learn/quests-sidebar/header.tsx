"use client";

import { useSession } from "@/hooks/use-session";
import ChooseSubjectSelect from "./choose-subject-select";
import { redirect } from "next/navigation";

export function Header() {
  const { data: userData } = useSession();
  if (!userData?.user) redirect("/login");
  const { user } = userData;
  return (
    <header className="flex h-24 w-full px-4 py-3">
      <ChooseSubjectSelect {...user} />
    </header>
  );
}
