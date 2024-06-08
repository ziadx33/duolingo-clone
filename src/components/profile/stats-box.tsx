import Image from "next/image";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

type StatsBoxProps = {
  caption?: string | number;
  image?: string;
  description?: string;
  className?: string;
};

export function StatsBox({
  caption,
  image,
  description,
  className,
}: StatsBoxProps) {
  return (
    <Card className={cn("flex h-fit items-start gap-3 p-4", className)}>
      <Image src={image ?? ""} alt={String(caption)} width={30} height={30} />
      <div>
        <h3 className="text-2xl">{caption}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}
