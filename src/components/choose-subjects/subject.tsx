import { type Subject } from "@prisma/client";
import Image from "next/image";
import { SubjectButton } from "./subject-button";
import { getServerAuthSession } from "@/server/auth";

export async function Subject({ code, name, id }: Subject) {
  const userData = await getServerAuthSession();
  const isAlreadyChosen = (userData?.user?.currentSubjectId ?? "") === id;
  return (
    <SubjectButton
      userData={userData?.user}
      isAlreadyChosen={!!isAlreadyChosen}
      subjectId={id}
    >
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
