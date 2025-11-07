"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isDatabaseError = error.message.includes("relation") || 
                          error.message.includes("does not exist") ||
                          error.message.includes("JSON");

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <div>
              <CardTitle className="text-2xl">
                {isDatabaseError ? "Database Not Set Up" : "Something went wrong!"}
              </CardTitle>
              <CardDescription>
                {isDatabaseError
                  ? "It looks like your database hasn't been configured yet."
                  : "We encountered an unexpected error."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isDatabaseError ? (
            <>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Quick Setup Required (2 minutes)</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Go to your <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Supabase Dashboard</a></li>
                  <li>Navigate to <strong>SQL Editor</strong></li>
                  <li>Click <strong>"New Query"</strong></li>
                  <li>Copy the entire contents of <code className="bg-background px-2 py-1 rounded">supabase/schema.sql</code></li>
                  <li>Paste into the editor and click <strong>"Run"</strong></li>
                  <li>Wait for completion (10-20 seconds)</li>
                  <li>Refresh this page</li>
                </ol>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> The database schema creates all necessary tables, 
                  security policies, storage buckets, and functions. This is a one-time setup.
                </p>
              </div>

              <div className="space-y-2">
                <Button onClick={reset} className="w-full">
                  I've set up the database - Refresh
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('/QUICKSTART.md', '_blank')}
                >
                  View Full Setup Guide
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-mono text-destructive">
                  {error.message}
                </p>
              </div>

              <div className="space-y-2">
                <Button onClick={reset} className="w-full">
                  Try again
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = '/'}
                >
                  Go back home
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

