"use client";

import { api } from "@/trpc/react";
import { type Subject } from "@prisma/client";
import { useSession } from "@/hooks/use-session";
import { type ReactNode } from "react";

type SubjectButtonProps = {
  children: ReactNode;
  subjectId: Subject["id"];
  isAlreadyChosen: boolean;
};

export function SubjectButton({
  children,
  subjectId,
  isAlreadyChosen,
}: SubjectButtonProps) {
  const { mutateAsync: addCurrentSubject } = api.auth.user.update.useMutation();
  const { update: updateUser, data: userData } = useSession();
  const addSubjectHandler = async () => {
    await updateUser({
      currentSubjectId: subjectId,
    });
    await addCurrentSubject({
      id: userData?.user?.id ?? "",
      data: {
        currentSubjectId: subjectId,
      },
    });
    location.pathname = "/learn";
  };
  return (
    <button
      disabled={isAlreadyChosen}
      onClick={isAlreadyChosen ? undefined : addSubjectHandler}
      className="relative flex h-[175px] w-[172px] flex-col items-center justify-center gap-4 rounded-lg border px-[12px] pb-[24px] pt-[12px] transition duration-200 hover:bg-secondary"
    >
      {children}
    </button>
  );
}
