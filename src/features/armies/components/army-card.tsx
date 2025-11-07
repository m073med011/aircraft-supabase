import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactionButtons } from "@/components/reactions/reaction-buttons";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";

interface ArmyCardProps {
  army: any;
}

export function ArmyCard({ army }: ArmyCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          {army.countries?.flag_url && (
            <Image
              src={army.countries.flag_url}
              alt={`${army.countries.name} flag`}
              width={30}
              height={18}
              className="rounded border"
            />
          )}
          <CardTitle className="text-lg">{army.name}</CardTitle>
        </div>
        <div className="flex gap-2 text-sm">
          <span className="px-2 py-1 bg-primary/10 rounded-md">
            {army.branch}
          </span>
        </div>
        {army.countries && (
          <p className="text-sm text-muted-foreground">{army.countries.name}</p>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {army.description && (
          <p className="text-sm line-clamp-3 mb-4">{army.description}</p>
        )}
        <div className="space-y-2 text-sm">
          {army.personnel_count && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Personnel:</span>
              <span className="font-medium">
                {formatNumber(army.personnel_count)}
              </span>
            </div>
          )}
          {army.headquarters && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Headquarters:</span>
              <span className="font-medium">{army.headquarters}</span>
            </div>
          )}
          {army.founded_year && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Founded:</span>
              <span className="font-medium">{army.founded_year}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <ReactionButtons
          entityType="army"
          entityId={army.id}
          initialCounts={{
            like_count: army.like_count || 0,
            dislike_count: army.dislike_count || 0,
            love_count: army.love_count || 0,
          }}
        />
      </CardFooter>
    </Card>
  );
}
