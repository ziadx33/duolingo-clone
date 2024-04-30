import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginForm } from "./_components/login-form";

export default function Login() {
  return (
    <main className="flex flex-col">
      <LoginForm />
      <Button asChild variant="outline" className="absolute right-8 top-6">
        <Link href="/register">register</Link>
      </Button>
    </main>
  );
}
