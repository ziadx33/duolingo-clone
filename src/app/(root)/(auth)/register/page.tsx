import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RegisterForm } from "./_components/register-form";

export default async function Register() {
  return (
    <main className="flex flex-col">
      <RegisterForm />
      <Button asChild variant="outline" className="absolute right-8 top-6">
        <Link href="/login">login</Link>
      </Button>
    </main>
  );
}
