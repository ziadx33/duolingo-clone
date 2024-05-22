"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { useTheme } from "next-themes";
import { notFound, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

type VerifyingProps = {
  token: string;
};

export function Verifying({ token }: VerifyingProps) {
  const router = useRouter();
  const theme = useTheme();
  if (!token) notFound();
  const { mutate: verify } = api.auth.verificationTokens.verify.useMutation({
    onError: (err) => toast.error(err.message),
    onSuccess: () => router.push("/login"),
  });

  const submit = useCallback(() => {
    verify({ token });
  }, [token, verify]);

  useEffect(() => {
    void submit();
  }, [submit]);

  return (
    <div className="grid h-screen place-items-center">
      <Card>
        <CardHeader>Verifying your account...</CardHeader>
        <CardContent className="flex justify-center">
          <BeatLoader
            color={theme?.resolvedTheme === "dark" ? "white" : "black"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
