import { Verifying } from "@/components/verification-token/verifying";

export default function VerificationTokenPage({
  searchParams: { token },
}: {
  searchParams: { token: string };
}) {
  return <Verifying token={token} />;
}
