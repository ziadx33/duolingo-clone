"use client";

import { PROTECTED_ROUTES } from "@/constants";
import { type User } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode } from "react";

export function UserDataProvider({
  userData,
  children,
}: {
  userData: User | undefined;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isIncludingProtectedRoutes = PROTECTED_ROUTES.some((r) =>
    pathname?.startsWith(r),
  );
  if (!userData && isIncludingProtectedRoutes) {
    router.push("/login");
  } else if (
    pathname !== "/choose-subjects" &&
    isIncludingProtectedRoutes &&
    userData?.currentSubjectId === ""
  ) {
    router.push("/choose-subjects");
  }
  return children;
}
