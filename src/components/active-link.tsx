"use client";

import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentPropsWithoutRef } from "react";

type ActiveLink = {
  activeClasses?: string;
} & LinkProps &
  ComponentPropsWithoutRef<"a">;

export function ActiveLink({
  children,
  className,
  activeClasses,
  ...restProps
}: ActiveLink) {
  const pathname = usePathname();
  return (
    <Link
      {...restProps}
      className={cn(
        className,
        pathname.startsWith(restProps.href) && activeClasses,
      )}
    >
      {children}
    </Link>
  );
}
