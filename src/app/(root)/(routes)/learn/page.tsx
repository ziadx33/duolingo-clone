"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const { data } = useSession();
  return <h1>Hello! {data?.user?.name}.</h1>;
}
