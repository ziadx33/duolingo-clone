"use client";

import { api } from "@/trpc/react";
import { type Subject } from "@prisma/client";
import { useSession } from "@/hooks/use-session";
import { type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { type User } from "@prisma/client";

type SubjectButtonProps = {
  children: ReactNode;
  subjectId: Subject["id"];
  isAlreadyChosen: boolean;
  userData: User | undefined;
};

export function SubjectButton({
  children,
  subjectId,
  isAlreadyChosen,
  userData,
}: SubjectButtonProps) {
  const { mutateAsync: addCurrentSubject } = api.auth.user.update.useMutation();
  const { update: updateUser } = useSession();
  const router = useRouter();
  const addSubjectHandler = async () => {
    if (isAlreadyChosen) return router.push("/learn");
    if (userData) {
      await updateUser({
        currentSubjectId: subjectId,
      });
      await addCurrentSubject({
        id: userData?.id ?? "",
        data: {
          currentSubjectId: subjectId,
        },
      });
      location.pathname = "/learn";
    } else router.push(`/register?subjectId=${subjectId}`);
  };
  return (
    <button
      onClick={addSubjectHandler}
      className={cn(
        "relative flex h-[175px] w-[172px] flex-col items-center justify-center gap-4 rounded-lg border px-[12px] pb-[24px] pt-[12px] transition duration-200 hover:bg-secondary",
        isAlreadyChosen ? "bg-muted" : "",
      )}
    >
      {children}
    </button>
  );
}
