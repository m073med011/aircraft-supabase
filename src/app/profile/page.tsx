import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Get user's reactions
  const { data: reactions } = await supabase
    .from("reactions")
    .select("*")
    .eq("user_id", user.id);

  const reactionCounts = {
    like: reactions?.filter((r) => r.reaction_type === "like").length || 0,
    dislike:
      reactions?.filter((r) => r.reaction_type === "dislike").length || 0,
    love: reactions?.filter((r) => r.reaction_type === "love").length || 0,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6 mb-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback className="text-2xl">
                    {(profile?.full_name || user.email || "U")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">
                    {profile?.full_name || "User"}
                  </h2>
                  <p className="text-muted-foreground mb-2">{user.email}</p>
                  {profile?.role === "admin" && (
                    <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                      Admin
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <p className="font-medium">
                    {new Date(profile?.created_at || "").toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Likes</span>
                    <span className="font-bold text-lg">
                      {reactionCounts.like}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Dislikes
                    </span>
                    <span className="font-bold text-lg">
                      {reactionCounts.dislike}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Loves</span>
                    <span className="font-bold text-lg">
                      {reactionCounts.love}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {profile?.role === "admin" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Admin Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
