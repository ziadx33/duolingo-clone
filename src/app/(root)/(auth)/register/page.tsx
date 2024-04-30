import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RegisterForm } from "../../../../components/register/register-form";
import { redirect } from "next/navigation";

export default async function Register({
  searchParams: { subjectId },
}: {
  searchParams: { subjectId?: string };
}) {
  if (!subjectId) redirect("/choose-subjects");
  return (
    <main className="flex flex-col">
      <RegisterForm subjectId={subjectId} />
      <Button asChild variant="outline" className="absolute right-8 top-6">
        <Link href="/login">login</Link>
      </Button>
    </main>
  );
}
