"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginForm } from "./_components/login-form";
import { useSession } from "next-auth/react";

export default function Register() {
  const { data } = useSession();
  console.log(data);
  return (
    <main className="flex flex-col">
      <LoginForm />
      <Button asChild variant="outline" className="absolute right-8 top-6">
        <Link href="/register">register</Link>
      </Button>
    </main>
  );
}
