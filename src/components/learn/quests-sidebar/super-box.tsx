import { LoadingLink } from "@/components/loading-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export function SuperBox() {
  return (
    <Card>
      <CardHeader className="!flex flex-row justify-between gap-2">
        <div>
          <CardTitle className="text-lg">Try super for free!</CardTitle>
          <CardDescription>
            No ads, personalized practice, and unlimited Legendary!
          </CardDescription>
        </div>
        <Image
          src="https://d35aaqx5ub95lt.cloudfront.net/images/super/fb7130289a205fadd2e196b9cc866555.svg"
          alt="super"
          width={80}
          height={80}
        />
      </CardHeader>
      <CardContent className="w-full">
        <LoadingLink
          className="w-full"
          loadingText="redirecting..."
          href="/subscriptions"
        >
          start now
        </LoadingLink>
      </CardContent>
    </Card>
  );
}
