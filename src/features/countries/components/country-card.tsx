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
import { formatNumber, formatCurrency } from "@/lib/utils";
import Image from "next/image";

interface CountryCardProps {
  country: any;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          {country.flag_url && (
            <Image
              src={country.flag_url}
              alt={`${country.name} flag`}
              width={40}
              height={24}
              className="rounded border"
            />
          )}
          <CardTitle>{country.name}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">Code: {country.code}</p>
      </CardHeader>
      <CardContent className="flex-1">
        {country.description && (
          <p className="text-sm line-clamp-3 mb-4">{country.description}</p>
        )}
        <div className="space-y-2 text-sm">
          {country.population && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Population:</span>
              <span className="font-medium">
                {formatNumber(country.population)}
              </span>
            </div>
          )}
          {country.military_budget && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Military Budget:</span>
              <span className="font-medium">
                {formatCurrency(country.military_budget)}
              </span>
            </div>
          )}
          {country.active_personnel && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Personnel:</span>
              <span className="font-medium">
                {formatNumber(country.active_personnel)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <ReactionButtons
          entityType="country"
          entityId={country.id}
          initialCounts={{
            like_count: country.like_count || 0,
            dislike_count: country.dislike_count || 0,
            love_count: country.love_count || 0,
          }}
        />
        <Button asChild className="w-full">
          <Link href={`/countries/${country.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
