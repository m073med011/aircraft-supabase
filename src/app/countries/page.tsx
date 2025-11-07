import { createClient } from "@/lib/supabase/server";
import { CountryCard } from "@/features/countries/components/country-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function CountriesPage() {
  const supabase = await createClient();

  // Fetch countries with reaction counts using the view
  const { data: countries, error } = await supabase
    .from("countries_with_reactions")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching countries:", error);
    // If the view doesn't exist, the database hasn't been set up
    if (error.message.includes("does not exist")) {
      throw new Error("Database not set up. Please run the schema.sql file in your Supabase dashboard.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Countries</h1>
          <p className="text-muted-foreground">
            Explore military capabilities and defense information by country
          </p>
        </div>
      </div>

      {!countries || countries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No countries found.</p>
          <p className="text-sm text-muted-foreground">
            Please ask your administrator to add some countries to the database.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <CountryCard key={country.id} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

