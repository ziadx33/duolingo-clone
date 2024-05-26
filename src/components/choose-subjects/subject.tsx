"use client";

import { type Subject } from "@prisma/client";
import Image from "next/image";
import { SubjectButton } from "./subject-button";
import { useSession } from "@/hooks/use-session";
import { Checkbox } from "../ui/checkbox";

export function Subject({ code, name, id }: Subject) {
  const userData = useSession();
  const isAlreadyChosen = userData?.data?.user?.currentSubjectId === id;
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
