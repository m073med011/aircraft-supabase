import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export const revalidate = 60;

export default async function RelationsPage() {
  const supabase = await createClient();

  const { data: relations, error } = await supabase
    .from("country_weapon_relations")
    .select(
      `
      *,
      countries (name, code, flag_url),
      weapons (name, category, image_url)
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching relations:", error);
    if (error.message.includes("does not exist")) {
      throw new Error("Database not set up. Please run the schema.sql file in your Supabase dashboard.");
    }
  }

  // Group relations by type
  const groupedRelations = {
    ownership: relations?.filter((r) => r.relation_type === "ownership") || [],
    usage: relations?.filter((r) => r.relation_type === "usage") || [],
    export: relations?.filter((r) => r.relation_type === "export") || [],
    import: relations?.filter((r) => r.relation_type === "import") || [],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Country-Weapon Relations</h1>
        <p className="text-muted-foreground">
          Track ownership, usage, export, and import relationships between
          countries and weapons
        </p>
      </div>

      {!relations || relations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No relations found.</p>
          <p className="text-sm text-muted-foreground">
            Please ask your administrator to add some relations to the database.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedRelations).map(
            ([type, items]) =>
              items.length > 0 && (
                <div key={type}>
                  <h2 className="text-2xl font-bold mb-4 capitalize">{type}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((relation: any) => (
                      <Card key={relation.id}>
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            {relation.countries?.flag_url && (
                              <Image
                                src={relation.countries.flag_url}
                                alt={`${relation.countries.name} flag`}
                                width={30}
                                height={18}
                                className="rounded border"
                              />
                            )}
                            <CardTitle className="text-lg">
                              {relation.countries?.name || "Unknown"}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Weapon:
                              </p>
                              <p className="font-medium">
                                {relation.weapons?.name || "Unknown"}
                              </p>
                              {relation.weapons?.category && (
                                <span className="text-xs px-2 py-1 bg-primary/10 rounded-md">
                                  {relation.weapons.category}
                                </span>
                              )}
                            </div>
                            {relation.quantity && (
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Quantity:
                                </p>
                                <p className="font-medium">
                                  {relation.quantity}
                                </p>
                              </div>
                            )}
                            {(relation.start_year || relation.end_year) && (
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Period:
                                </p>
                                <p className="font-medium">
                                  {relation.start_year || "?"} -{" "}
                                  {relation.end_year || "Present"}
                                </p>
                              </div>
                            )}
                            {relation.notes && (
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Notes:
                                </p>
                                <p className="text-sm">{relation.notes}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
