import { createClient, createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  try {
    const supabase = await createClient();
    
    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check admin status
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
    }

    // Fetch all users with their profiles
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ users: profiles });
  } catch (error: any) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new user (admin only)
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
    }

    const body = await request.json();
    const { email, password, full_name, role, avatar_url } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Use admin client for admin operations
    const adminClient = createAdminClient();

    // Create user via Supabase Auth Admin API
    const { data: newUser, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: full_name || "",
      },
    });

    if (authError) throw authError;

    // Update profile with role and avatar_url if specified
    if (newUser.user) {
      const profileUpdateData: any = {};
      if (role && (role === "user" || role === "admin")) {
        profileUpdateData.role = role;
      }
      if (avatar_url) {
        profileUpdateData.avatar_url = avatar_url;
      }
      if (full_name) {
        profileUpdateData.full_name = full_name;
      }

      if (Object.keys(profileUpdateData).length > 0) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update(profileUpdateData)
          .eq("id", newUser.user.id);

        if (updateError) {
          console.error("Error updating profile:", updateError);
        }
      }
    }

    return NextResponse.json({ user: newUser.user, message: "User created successfully" });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}

