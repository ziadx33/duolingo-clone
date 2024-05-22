"use client";

import { PROTECTED_ROUTES } from "@/constants";
import { useSession } from "@/hooks/use-session";
import { usePathname, useRouter } from "next/navigation";

export function AuthProvider() {
  const pathname = usePathname();
  const router = useRouter();
  const isIncludingProtectedRoutes = PROTECTED_ROUTES.some((r) =>
    pathname.startsWith(r),
  );
  const { data: user_data } = useSession();
  if (!user_data && isIncludingProtectedRoutes) {
    return router.push("/login");
  }

  if (
    pathname !== "/choose-subjects" &&
    isIncludingProtectedRoutes &&
    user_data?.user?.currentSubjectId === ""
  ) {
    return router.push("/choose-subjects");
  }
  return null;
}
