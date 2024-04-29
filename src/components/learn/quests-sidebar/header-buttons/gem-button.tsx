import { type User } from "@prisma/client";
import Image from "next/image";

export function GemButton({ gem }: { gem: User["gem"] | undefined }) {
  return (
    <div className="flex h-fit items-center gap-1.5 text-[#49c0f8]">
      <Image
        src={`/images/icons/gem.svg`}
        width={25}
        height={25}
        alt="streak"
      />
      {gem}
    </div>
  );
}
