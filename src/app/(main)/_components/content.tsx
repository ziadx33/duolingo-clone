import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Content() {
  return (
    <div className="flex h-full w-full">
      <div className="flex h-full w-full flex-1 items-center justify-end">
        <Image
          src="/images/pages/hero/animate.svg"
          alt="animate"
          width={500}
          height={500}
          draggable="false"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-12">
        <h1 className="mr-auto text-center text-3xl">
          The free, fun, and effective, way to <br /> learn a language!
        </h1>
        <div className="ml-24 flex w-[350px] flex-col gap-2">
          <Button className="text-md h-12 w-full" asChild>
            <Link href="/register">get started</Link>
          </Button>
          <Button variant="outline" className="text-md h-12 w-full">
            I already have an account
          </Button>
        </div>
      </div>
    </div>
  );
}
