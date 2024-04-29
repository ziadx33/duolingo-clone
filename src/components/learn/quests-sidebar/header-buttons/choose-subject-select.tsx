import { api } from "@/trpc/react";
import { type User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { RotatingLines } from "react-loader-spinner";

type ChooseSubjectSelectProps = Partial<User>;

function ChooseSubjectSelect({ currentSubjectId }: ChooseSubjectSelectProps) {
  const { data: currentSubject, isLoading } = api.subjects.get.useQuery({
    id: currentSubjectId ?? "",
  });
  if (isLoading)
    return (
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="40"
        visible={true}
      />
    );
  return (
    <Link href="/choose-subjects" className="h-fit w-fit">
      <Image
        alt={currentSubjectId ?? "choose a subject"}
        width={45}
        height={45}
        src={`/images/flags/${currentSubject?.code}.svg`}
      />
    </Link>
  );
}

export default ChooseSubjectSelect;
