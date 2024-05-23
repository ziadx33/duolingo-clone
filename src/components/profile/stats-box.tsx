import Image from "next/image";
import { Card } from "../ui/card";

type StatsBoxProps = {
  caption?: string | number;
  image?: string;
  description?: string;
};

export function StatsBox({ caption, image, description }: StatsBoxProps) {
  return (
    <Card className="flex h-fit items-start gap-3 p-4">
      <Image src={image ?? ""} alt={String(caption)} width={30} height={30} />
      <div>
        <h3 className="text-2xl">{caption}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}
