import { type Subject } from "@prisma/client";
import Image from "next/image";
import { SubjectButton } from "./subject-button";
import { Checkbox } from "../ui/checkbox";
import { getServerAuthSession } from "@/server/auth";

export async function Subject({ code, name, id }: Subject) {
  const { user } = await getServerAuthSession();
  const isAlreadyChosen = (user?.currentSubjectId ?? "") === id;
  return (
    <SubjectButton
      userData={user}
      isAlreadyChosen={!!isAlreadyChosen}
      subjectId={id}
    >
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
