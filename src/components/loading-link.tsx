"use client";

import { useRouter } from "next/navigation";
import {
  type MouseEvent,
  type ReactNode,
  useTransition,
  type ComponentPropsWithoutRef,
} from "react";
import { Button, type ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

type LoadingLinkProps = ComponentPropsWithoutRef<"a"> &
  ButtonProps & {
    href: string;
    loadingText: string;
    children: ReactNode;
    disabled?: boolean;
  };

export function LoadingLink({
  href,
  children,
  loadingText,
  disabled,
  ...restProps
}: LoadingLinkProps) {
  const router = useRouter();
  const [isPending, startPendingTransition] = useTransition();
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    startPendingTransition(() => {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      router.push(href);
    });
  };
  return (
    <Button {...restProps} disabled={isPending || disabled}>
      <a
        {...restProps}
        className={cn(
          "grid h-full w-full place-items-center",
          restProps.className,
        )}
        onClick={(e) => handleClick(e)}
        href={href}
      >
        {!isPending ? children : loadingText}
      </a>
    </Button>
  );
}
