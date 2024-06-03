"use client";

import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentPropsWithoutRef } from "react";

type ActiveLink = {
  activeClasses?: string;
  cache?: boolean;
} & LinkProps &
  ComponentPropsWithoutRef<"a">;

export function ActiveLink({
  children,
  className,
  activeClasses,
  cache = true,
  ...restProps
}: ActiveLink) {
  const pathname = usePathname();
  const Component = cache ? Link : "a";
  return (
    <Component
      {...restProps}
      className={cn(
        className,
        pathname.startsWith(restProps.href) && activeClasses,
      )}
    >
      {children}
    </Component>
  );
}
