import { type Subject } from "@prisma/client";
import Image from "next/image";

export function Subject({ code, name }: Subject) {
  return (
    <button className="flex h-[175px] w-[172px] flex-col items-center justify-center gap-4 rounded-lg border px-[12px] pb-[24px] pt-[12px] transition duration-200 hover:bg-secondary">
      <Image
        src={`/images/flags/${code}.svg`}
        alt={code}
        width={100}
        height={100}
        draggable="false"
      />
      <h3 className="text-center">{name}</h3>
    </button>
  );
}
