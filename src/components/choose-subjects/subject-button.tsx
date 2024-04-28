"use client";

import { api } from "@/trpc/react";
import { type User, type Subject } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  const { mutateAsync: addSubject } = api.auth.user.subjects.add.useMutation();
  const { mutateAsync: removeSubject } =
    api.auth.user.subjects.remove.useMutation();
  const { update: updateUser, data: userData } = useSession() as unknown as {
    update: (obj: Partial<User>) => void;
    data?: { user: User };
  };
  const router = useRouter();
  const addSubjectHandler = async () => {
    updateUser({
      subjectIds: [...(userData?.user.subjectIds ?? []), subjectId],
    });
    await addSubject({ subjectId });
    router.push("/learn");
  };

  const removeSubjectHandler = async () => {
    updateUser({
      subjectIds: userData?.user.subjectIds.filter((id) => id !== subjectId),
    });
    await removeSubject({ subjectId });
  };
  return (
    <button
      onClick={isAlreadyChosen ? removeSubjectHandler : addSubjectHandler}
      className="relative flex h-[175px] w-[172px] flex-col items-center justify-center gap-4 rounded-lg border px-[12px] pb-[24px] pt-[12px] transition duration-200 hover:bg-secondary"
    >
      {children}
    </button>
  );
}
