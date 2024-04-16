"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export default function Register() {
  const { data } = useSession();
  console.log(data);
  return (
    <main className="flex flex-col">
      <div className="mx-auto flex h-screen w-96 flex-col items-center gap-4 py-32">
        <h1 className="mb-10 text-2xl">Create your profile</h1>
        <div>
          <Input placeholder="Age" className="mb-1" />
          <p className="text-sm">
            Providing your age ensures you get the right Duolingo experience.
            For more details, please visit our{" "}
            <span className="text-secondary">Privacy Policy</span>.
          </p>
        </div>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button className="w-full">create account</Button>
        <div className="relative my-2 h-[0.050rem] w-full bg-[#cecdcd] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:px-2 before:text-[#cecdcd] before:content-['or']" />
        <Button
          onClick={() => signIn("google")}
          variant="outline"
          className="w-full"
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
      </div>
      <Button asChild variant="outline" className="absolute right-8 top-6">
        <Link href="/login">login</Link>
      </Button>
    </main>
  );
}
