import { api } from "@/trpc/react";
import { type User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ChooseSubjectSelectProps = User;

function ChooseSubjectSelect({ currentSubjectId }: ChooseSubjectSelectProps) {
  const [, { data: currentSubject }] = api.subjects.get.useSuspenseQuery({
    id: currentSubjectId,
  });
  return (
    <Link href="/choose-subjects" className="h-fit w-fit">
      <Image
        alt={currentSubjectId}
        width={50}
        height={50}
        src={`/images/flags/${currentSubject?.code}.svg`}
      />
    </Link>
  );
}

export default ChooseSubjectSelect;
