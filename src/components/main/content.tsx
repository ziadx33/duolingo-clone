import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import { LoadingLink } from "../loading-link";

export async function Content() {
  const userData = await getServerAuthSession();
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
          {!userData ? (
            <>
              <LoadingLink
                className="text-md h-12 w-full"
                loadingText="loading..."
                href="/register"
              >
                get started
              </LoadingLink>
              <LoadingLink
                loadingText="loading..."
                variant="outline"
                className="text-md h-12 w-full"
                href="/login"
              >
                I already have an account
              </LoadingLink>
            </>
          ) : (
            <LoadingLink
              className="text-md h-12 w-full"
              loadingText="loading..."
              href="/learn"
            >
              Continue learning
            </LoadingLink>
          )}
        </div>
      </div>
    </div>
  );
}
