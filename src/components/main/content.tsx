import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import { LoadingLink } from "../loading-link";

export async function Content() {
  const userData = await getServerAuthSession();
  return (
    <div className="flex h-full w-full justify-center">
      <div className="hidden h-full w-full flex-1 items-center justify-end lg:flex">
        <Image
          src="/images/pages/hero/animate.svg"
          alt="animate"
          width={500}
          height={500}
          draggable="false"
        />
      </div>
      <div className="flex w-full flex-col justify-center gap-12 lg:flex-1">
        <h1 className="mx-auto text-center text-3xl lg:mx-0 lg:mr-auto">
          The free, fun, and effective, way to <br /> learn a language!
        </h1>
        <div className="mx-auto flex w-full max-w-96 flex-col gap-2 lg:ml-20">
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
