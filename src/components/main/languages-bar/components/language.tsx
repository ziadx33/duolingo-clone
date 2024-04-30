import { type Subject } from "@prisma/client";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";

type LanguageProps = Subject & Omit<LinkProps, "href">;

export function Language({ id, code, name, ...restProps }: LanguageProps) {
  return (
    <Link
      {...restProps}
      className="flex h-12 items-center"
      href={`/register?subjectId=${id}`}
    >
      <Image
        src={`/images/flags/${code}.svg`}
        alt={name}
        width={40}
        height={40}
        className="rounded-md object-cover"
      />
    </Link>
  );
}
