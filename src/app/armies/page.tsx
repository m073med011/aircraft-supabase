import { createClient } from "@/lib/supabase/server";
import { ArmyCard } from "@/features/armies/components/army-card";

export const revalidate = 60;

export default async function ArmiesPage() {
  const supabase = await createClient();

  const { data: armies, error } = await supabase
    .from("armies_with_reactions")
    .select(
      `
      *,
      countries (name, code, flag_url)
    `
    )
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching armies:", error);
    if (error.message.includes("does not exist")) {
      throw new Error("Database not set up. Please run the schema.sql file in your Supabase dashboard.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Military Forces</h1>
        <p className="text-muted-foreground">
          Explore military branches and forces from different countries
        </p>
      </div>

      {!armies || armies.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No military forces found.
          </p>
          <p className="text-sm text-muted-foreground">
            Please ask your administrator to add some military forces to the
            database.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {armies.map((army) => (
            <ArmyCard key={army.id} army={army} />
          ))}
        </div>
      )}
    </div>
  );
}
