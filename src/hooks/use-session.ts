import { type User } from "@prisma/client";
import { type ISODateString } from "next-auth";
import {
  type UseSessionOptions,
  useSession as useNextAuthSession,
} from "next-auth/react";

type UpdateSession = (data?: Partial<User>) => Promise<User | null>;

type Session = { user?: User; expires: ISODateString };

type UseSessionParams<T extends boolean = false> = T extends true
  ?
      | { update: UpdateSession; data: Session; status: "authenticated" }
      | { update: UpdateSession; data: null; status: "loading" }
  :
      | { update: UpdateSession; data: Session; status: "authenticated" }
      | {
          update: UpdateSession;
          data: null;
          status: "unauthenticated" | "loading";
        };

export function useSession<T extends boolean = false>(
  options?: UseSessionOptions<boolean> | undefined,
): UseSessionParams<T> {
  const data = useNextAuthSession(options);
  return data as unknown as UseSessionParams<T>;
}
