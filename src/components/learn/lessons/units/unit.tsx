import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type Unit } from "@prisma/client";

type UnitProps = { unitIndex: number } & Unit;

export function Unit({ unitIndex, description }: UnitProps) {
  return (
    <div>
      <Card className="flex h-24 w-full items-center justify-between p-4">
        <div>
          <h3 className="text-md mb-2 text-muted-foreground">
            Unit {unitIndex}
          </h3>
          <h2 className="text-xl font-bold">{description}</h2>
        </div>
        <Button variant="outline" className="h-12">
          Guidebook
        </Button>
      </Card>
    </div>
  );
}
