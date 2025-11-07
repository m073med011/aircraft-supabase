import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, Plane, Users, GitBranch, UserCog } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  // Fetch counts
  const { count: countriesCount } = await supabase
    .from("countries")
    .select("*", { count: "exact", head: true });

  const { count: weaponsCount } = await supabase
    .from("weapons")
    .select("*", { count: "exact", head: true });

  const { count: armiesCount } = await supabase
    .from("armies")
    .select("*", { count: "exact", head: true });

  const { count: relationsCount } = await supabase
    .from("country_weapon_relations")
    .select("*", { count: "exact", head: true });

  const { count: usersCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your military database content
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/users">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-medium">User Management</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Add, edit, and manage users
                </p>
              </div>
              <UserCog className="h-8 w-8 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{usersCount || 0}</div>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-medium">Data Overview</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                View content statistics
              </p>
            </div>
            <Shield className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Countries:</span>
                <span className="font-semibold">{countriesCount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Weapons:</span>
                <span className="font-semibold">{weaponsCount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Armies:</span>
                <span className="font-semibold">{armiesCount || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-medium">Relations</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Weapon relationships
              </p>
            </div>
            <GitBranch className="h-8 w-8 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{relationsCount || 0}</div>
            <p className="text-xs text-muted-foreground">Total Relations</p>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="countries">Countries</TabsTrigger>
              <TabsTrigger value="weapons">Weapons</TabsTrigger>
              <TabsTrigger value="armies">Armies</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 mt-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Getting Started with Dashboard</h3>
                <p>
                  Welcome to the admin dashboard! From here you can manage all content
                  in the military database.
                </p>
                <h4>How to Add Content:</h4>
                <ol>
                  <li>Go to your Supabase dashboard</li>
                  <li>Navigate to the Table Editor</li>
                  <li>Select the table you want to add data to (countries, weapons, armies, or country_weapon_relations)</li>
                  <li>Click "Insert row" and fill in the details</li>
                  <li>The changes will appear on the site within 60 seconds (ISR)</li>
                </ol>
                <h4>Storage for Media Files:</h4>
                <ol>
                  <li>Go to Storage in your Supabase dashboard</li>
                  <li>Upload images to the appropriate bucket (weapons, armies, countries)</li>
                  <li>Copy the public URL and paste it in the corresponding table field</li>
                </ol>
                <h4>Important Notes:</h4>
                <ul>
                  <li>Only admins can add, edit, or delete content</li>
                  <li>All users can view content and react to it</li>
                  <li>Reactions are tracked per user and entity</li>
                  <li>The site uses Incremental Static Regeneration (ISR) for optimal performance</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="countries" className="mt-4">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  To add countries, use the Supabase dashboard Table Editor for the
                  "countries" table.
                </p>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Quick Guide:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>name: Country name (required, unique)</li>
                    <li>code: ISO country code like "US", "RU" (required, unique)</li>
                    <li>flag_url: Public URL to flag image</li>
                    <li>description: Brief description of the country</li>
                    <li>population, gdp, military_budget: Numeric values</li>
                    <li>active_personnel, reserve_personnel: Personnel counts</li>
                    <li>total_aircraft, total_tanks, total_naval_assets: Military assets</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="weapons" className="mt-4">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  To add weapons, use the Supabase dashboard Table Editor for the
                  "weapons" table.
                </p>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Quick Guide:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>name: Weapon name (required)</li>
                    <li>category: e.g., "Aircraft", "Tank", "Naval", "Missile" (required)</li>
                    <li>type: More specific type, e.g., "Fighter Jet"</li>
                    <li>manufacturer: Company/organization that builds it</li>
                    <li>origin_country_id: UUID of the origin country</li>
                    <li>description: Detailed description</li>
                    <li>specifications: JSON object with technical specs</li>
                    <li>image_url, video_url: Media URLs from Storage</li>
                    <li>first_deployed: Year as integer</li>
                    <li>unit_cost: Cost in USD</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="armies" className="mt-4">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  To add military forces, use the Supabase dashboard Table Editor for the
                  "armies" table.
                </p>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Quick Guide:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>country_id: UUID of the country (required)</li>
                    <li>name: Name of the force (required)</li>
                    <li>branch: e.g., "Air Force", "Navy", "Army", "Special Forces" (required)</li>
                    <li>description: Brief description</li>
                    <li>personnel_count: Number of personnel</li>
                    <li>headquarters: Location of HQ</li>
                    <li>founded_year: Year founded</li>
                    <li>logo_url: Public URL to logo image</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

