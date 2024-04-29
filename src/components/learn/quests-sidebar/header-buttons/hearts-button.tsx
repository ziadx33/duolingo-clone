import { type User } from "@prisma/client";
import Image from "next/image";

export function HeartsButton({
  hearts,
}: {
  hearts: User["hearts"] | undefined;
}) {
  return (
    <div className="flex h-fit items-center gap-1.5 text-red-600">
      <Image
        src={`/images/icons/heart.svg`}
        width={30}
        height={30}
        alt="hearts"
      />
      {hearts}
    </div>
  );
}
