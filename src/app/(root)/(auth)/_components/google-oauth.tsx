"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export function GoogleOAuth() {
  return (
    <Button
      onClick={() => signIn("google")}
      variant="outline"
      className="w-full"
      type="button"
    >
      <Image
        src="/images/brands/google.png"
        width="22"
        height="22"
        alt="google"
        className="mr-1.5"
      />
      google
    </Button>
  );
}
