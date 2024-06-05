import { type User } from "@prisma/client";
import { useSession } from "./use-session";
import { api } from "@/trpc/react";

export function useUpdateUser() {
  const { update: updateSession, data: user } = useSession();
  const { mutateAsync: updateUser } = api.auth.user.update.useMutation();
  const update = async ({ data }: { data: Partial<User> }) => {
    void updateSession(data);
    if (!user?.user?.id) return;
    await updateUser({
      id: user?.user?.id,
      data: data,
    });
  };
  return { update };
}
