"use client";

import { useRouter } from "next/navigation";
import {
  type MouseEvent,
  type ReactNode,
  useTransition,
  type ComponentPropsWithoutRef,
} from "react";
import { Button, type ButtonProps } from "./ui/button";

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
        className="h-full w-full"
        onClick={(e) => handleClick(e)}
        href={href}
      >
        {!isPending ? children : loadingText}
      </a>
    </Button>
  );
}
