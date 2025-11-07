import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Database, Shield } from "lucide-react";
import Link from "next/link";

export default function SetupPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Database Setup Required</h1>
        <p className="text-xl text-muted-foreground">
          Before you can use the application, you need to set up your database.
          This is a one-time process that takes about 2 minutes.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Database className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Setup Instructions</CardTitle>
              <CardDescription>Follow these steps to configure your Supabase database</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ol className="space-y-6">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Open Supabase Dashboard</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Go to your Supabase project dashboard
                </p>
                <Button asChild variant="outline" size="sm">
                  <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
                    Open Dashboard →
                  </a>
                </Button>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Navigate to SQL Editor</h3>
                <p className="text-sm text-muted-foreground">
                  In the left sidebar, click on <strong>SQL Editor</strong>
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Create New Query</h3>
                <p className="text-sm text-muted-foreground">
                  Click the <strong>"New Query"</strong> button
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Copy the Schema File</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Open the file <code className="bg-muted px-2 py-1 rounded">supabase/schema.sql</code> from your project
                  and copy its entire contents (it's about 500 lines)
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                5
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Paste and Run</h3>
                <p className="text-sm text-muted-foreground">
                  Paste the schema into the SQL editor and click the <strong>"Run"</strong> button.
                  Wait for it to complete (should take 10-20 seconds).
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                6
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Verify Setup</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  You should see "Success. No rows returned" at the bottom. 
                  Check the <strong>Table Editor</strong> to verify these tables exist:
                </p>
                <ul className="text-sm list-disc list-inside text-muted-foreground space-y-1">
                  <li>profiles</li>
                  <li>countries</li>
                  <li>weapons</li>
                  <li>armies</li>
                  <li>country_weapon_relations</li>
                  <li>reactions</li>
                </ul>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Done!</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Your database is now set up. You can start using the application!
                </p>
                <Button asChild>
                  <Link href="/">Go to Home Page</Link>
                </Button>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 mb-2 text-primary" />
            <CardTitle className="text-lg">What Gets Created?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>6 database tables</li>
              <li>3 optimized database views</li>
              <li>Row Level Security policies</li>
              <li>Helper functions and triggers</li>
              <li>3 storage buckets for media</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Database className="h-8 w-8 mb-2 text-primary" />
            <CardTitle className="text-lg">Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p className="text-muted-foreground">
              Check the documentation files in your project:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>README.md - Complete documentation</li>
              <li>QUICKSTART.md - 5-minute guide</li>
              <li>DEPLOYMENT.md - Production setup</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

