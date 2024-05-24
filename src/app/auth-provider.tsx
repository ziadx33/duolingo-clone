import { getServerAuthSession } from "@/server/auth";
import { type ReactNode } from "react";
import { UserDataProvider } from "./user-data-provider";

type AuthProviderProps = {
  children: ReactNode;
};

export async function AuthProvider({ children }: AuthProviderProps) {
  const userData = await getServerAuthSession();
  const user = userData?.user;
  return <UserDataProvider userData={user}>{children}</UserDataProvider>;
}
