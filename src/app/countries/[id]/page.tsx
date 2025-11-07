import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactionButtons } from "@/components/reactions/reaction-buttons";
import { formatNumber, formatCurrency } from "@/lib/utils";
import Image from "next/image";

interface CountryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CountryDetailPage({
  params,
}: CountryDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: country } = await supabase
    .from("countries_with_reactions")
    .select("*")
    .eq("id", id)
    .single();

  if (!country) {
    notFound();
  }

  // Fetch armies for this country
  const { data: armies } = await supabase
    .from("armies")
    .select("*")
    .eq("country_id", id);

  // Fetch weapon relations
  const { data: weaponRelations } = await supabase
    .from("country_weapon_relations")
    .select(
      `
      *,
      weapons (*)
    `
    )
    .eq("country_id", id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-6 mb-4">
          {country.flag_url && (
            <Image
              src={country.flag_url}
              alt={`${country.name} flag`}
              width={100}
              height={60}
              className="rounded border"
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{country.name}</h1>
            <p className="text-muted-foreground mb-4">Code: {country.code}</p>
            <ReactionButtons
              entityType="country"
              entityId={country.id}
              initialCounts={{
                like_count: country.like_count || 0,
                dislike_count: country.dislike_count || 0,
                love_count: country.love_count || 0,
              }}
            />
          </div>
        </div>

        {country.description && (
          <p className="text-lg">{country.description}</p>
        )}
      </div>

      {/* Statistics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {country.population && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Population</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(country.population)}
              </div>
            </CardContent>
          </Card>
        )}

        {country.gdp && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">GDP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(country.gdp)}
              </div>
            </CardContent>
          </Card>
        )}

        {country.military_budget && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Military Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(country.military_budget)}
              </div>
            </CardContent>
          </Card>
        )}

        {country.active_personnel && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Active Personnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(country.active_personnel)}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Military Assets */}
      {(country.total_aircraft ||
        country.total_tanks ||
        country.total_naval_assets) && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Military Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {country.total_aircraft && (
                <div>
                  <div className="text-sm text-muted-foreground">Aircraft</div>
                  <div className="text-2xl font-bold">
                    {formatNumber(country.total_aircraft)}
                  </div>
                </div>
              )}
              {country.total_tanks && (
                <div>
                  <div className="text-sm text-muted-foreground">Tanks</div>
                  <div className="text-2xl font-bold">
                    {formatNumber(country.total_tanks)}
                  </div>
                </div>
              )}
              {country.total_naval_assets && (
                <div>
                  <div className="text-sm text-muted-foreground">
                    Naval Assets
                  </div>
                  <div className="text-2xl font-bold">
                    {formatNumber(country.total_naval_assets)}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Armies */}
      {armies && armies.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Military Branches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {armies.map((army: any) => (
                <div key={army.id} className="border-b pb-4 last:border-0">
                  <h3 className="font-semibold text-lg">{army.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {army.branch}
                  </p>
                  {army.description && (
                    <p className="text-sm">{army.description}</p>
                  )}
                  {army.personnel_count && (
                    <p className="text-sm mt-2">
                      Personnel: {formatNumber(army.personnel_count)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weapons Relations */}
      {weaponRelations && weaponRelations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Weapons & Equipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weaponRelations.map((relation: any) => (
                <div key={relation.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        {relation.weapons?.name || "Unknown Weapon"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Type: {relation.relation_type}
                      </p>
                      {relation.quantity && (
                        <p className="text-sm">Quantity: {relation.quantity}</p>
                      )}
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      {relation.start_year && (
                        <div>From: {relation.start_year}</div>
                      )}
                      {relation.end_year && <div>To: {relation.end_year}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
