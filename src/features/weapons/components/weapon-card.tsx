import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactionButtons } from "@/components/reactions/reaction-buttons";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";

interface WeaponCardProps {
  weapon: any;
}

export function WeaponCard({ weapon }: WeaponCardProps) {
  return (
    <Card className="flex flex-col">
      {weapon.image_url && (
        <div className="relative h-48 w-full">
          <Image
            src={weapon.image_url}
            alt={weapon.name}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{weapon.name}</CardTitle>
        <div className="flex gap-2 text-sm">
          <span className="px-2 py-1 bg-primary/10 rounded-md">
            {weapon.category}
          </span>
          {weapon.type && (
            <span className="px-2 py-1 bg-secondary rounded-md">
              {weapon.type}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {weapon.description && (
          <p className="text-sm line-clamp-3 mb-4">{weapon.description}</p>
        )}
        <div className="space-y-2 text-sm">
          {weapon.manufacturer && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Manufacturer:</span>
              <span className="font-medium">{weapon.manufacturer}</span>
            </div>
          )}
          {weapon.first_deployed && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">First Deployed:</span>
              <span className="font-medium">{weapon.first_deployed}</span>
            </div>
          )}
          {weapon.unit_cost && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unit Cost:</span>
              <span className="font-medium">
                {formatCurrency(weapon.unit_cost)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <ReactionButtons
          entityType="weapon"
          entityId={weapon.id}
          initialCounts={{
            like_count: weapon.like_count || 0,
            dislike_count: weapon.dislike_count || 0,
            love_count: weapon.love_count || 0,
          }}
        />
        <Button asChild className="w-full">
          <Link href={`/weapons/${weapon.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
