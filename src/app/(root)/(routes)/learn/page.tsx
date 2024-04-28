"use client";

import { type User } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data } = useSession() as unknown as { data: { user: User } };
  console.log(data);
  return (
    <div>
      <h1>Hello! {data?.user?.name}.</h1>
    </div>
  );
}
