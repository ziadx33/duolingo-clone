import { fonts } from "@/fonts";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";

type LanguageProps = {
  name: string;
  code: string;
} & Omit<LinkProps, "href">;

export function Language({ code, name, ...restProps }: LanguageProps) {
  return (
    <Link {...restProps} className="flex h-12 items-center gap-2" href="/">
      <Image
        src={`/images/flags/${code}.png`}
        alt={name}
        width={40}
        height={40}
        className="rounded-md object-cover"
      />
      <h3 className={`font-bold text-gray-600 ${fonts[code]?.className}`}>
        {name}
      </h3>
    </Link>
  );
}
