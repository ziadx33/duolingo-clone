import Image from "next/image";
import { Button } from "../components/ui/button";
import React from "react";
import { LoadingLink } from "../components/loading-link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-4">
      <Image
        width={200}
        height={200}
        alt="not-found image"
        src="https://www.duolingo.com/images/error_pages/sad.svg"
      />
      <div className="flex h-56 flex-col items-start">
        <h1 className="text-3xl">Error 404</h1>
        <p className="w-96 pb-4 text-muted-foreground">
          Sorry, the page you were looking for doesn’t exist. Try going to
          duolingo.com, or follow us on Twitter or Facebook.
        </p>
        <Button asChild className="w-full">
          <LoadingLink loadingText="loading..." href="/">
            home page
          </LoadingLink>
        </Button>
      </div>
    </div>
  );
}
