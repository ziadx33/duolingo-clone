"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const { data } = useSession();
  return (
    <div>
      <h1>Hello! {data?.user?.name}.</h1>
    </div>
  );
}
