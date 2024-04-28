"use client";

import { type User, type Subject } from "@prisma/client";
import Image from "next/image";
import { SubjectButton } from "./subject-button";
import { useSession } from "next-auth/react";
import { Checkbox } from "../ui/checkbox";

export function Subject({ code, name, id }: Subject) {
  const { data: userData } = useSession() as unknown as {
    data?: { user: User };
  };
  const isAlreadyChosen = userData?.user?.subjectIds.includes(id);
  return (
    <SubjectButton isAlreadyChosen={!!isAlreadyChosen} subjectId={id}>
      {isAlreadyChosen && (
        <Checkbox
          checked={isAlreadyChosen}
          className="absolute right-2 top-2 h-6 w-6"
        />
      )}
      <Image
        src={`/images/flags/${code}.svg`}
        alt={code}
        width={100}
        height={100}
        draggable="false"
      />
      <h3 className="text-center">{name}</h3>
    </SubjectButton>
  );
}
