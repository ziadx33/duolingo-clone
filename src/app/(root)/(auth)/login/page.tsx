import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <main className="flex flex-col">
      <form className="mx-auto flex h-screen w-96 flex-col items-center gap-4 py-32">
        <h1 className="mb-10 text-2xl">Create your profile</h1>
        <div>
          <Input placeholder="Age" className="mb-1" />
          <p className="text-sm text-[#777777]">
            Providing your age ensures you get the right Duolingo experience.
            For more details, please visit our{" "}
            <span className="text-secondary">Privacy Policy</span>.
          </p>
        </div>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button className="w-full">create account</Button>
        <div className="relative my-2 h-[0.050rem] w-full before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-white before:px-2 before:text-[#cecdcd] before:content-['or']" />
        <Button variant="outline" className="w-full">
          <Image
            src="/images/brands/facebook.png"
            width="22"
            height="22"
            alt="facebook"
            className="mr-0.5"
          />
          google
        </Button>
      </form>
      <Button asChild variant="outline" className="absolute right-8 top-6">
        <Link href="/register">register</Link>
      </Button>
    </main>
  );
}
