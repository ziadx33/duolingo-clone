"use client";

import { PROTECTED_ROUTES } from "@/constants";
import { useSession } from "@/hooks/use-session";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode } from "react";

export function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isIncludingProtectedRoutes = PROTECTED_ROUTES.some((r) =>
    pathname.startsWith(r),
  );
  const { data: user_data } = useSession();
  if (!user_data && isIncludingProtectedRoutes) {
    router.push("/login");
  } else if (
    pathname !== "/choose-subjects" &&
    isIncludingProtectedRoutes &&
    user_data?.user?.currentSubjectId === ""
  ) {
    router.push("/choose-subjects");
  }
  return children;
}
