import { createClient, createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { Database } from "@/types/database.types";

// PUT - Update user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    const { full_name, role, email, avatar_url, password } = body;

    // Use admin client for admin operations
    const adminClient = createAdminClient();

    // Build update data for profile
    const updateData: any = {};
    if (full_name !== undefined) updateData.full_name = full_name;
    if (role !== undefined && (role === "user" || role === "admin")) {
      updateData.role = role;
    }
    if (email !== undefined) updateData.email = email;
    if (avatar_url !== undefined) updateData.avatar_url = avatar_url;

    // Update profile if there are changes
    if (Object.keys(updateData).length > 0) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", id);

      if (updateError) {
        console.error("Error updating profile:", updateError);
        throw updateError;
      }
    }

    // Fetch the updated profile
    const { data: updatedProfile, error: profileError } = await supabase
      .from("profiles")
      .select()
      .eq("id", id)
      .single();

    if (profileError) throw profileError;

    // Update auth user (email, password, user_metadata)
    const authUpdateData: any = {};
    if (email) authUpdateData.email = email;
    if (password) authUpdateData.password = password;
    if (full_name !== undefined) {
      authUpdateData.user_metadata = { full_name };
    }

    if (Object.keys(authUpdateData).length > 0) {
      const { error: authError } = await adminClient.auth.admin.updateUserById(
        id,
        authUpdateData
      );
      if (authError) {
        console.error("Error updating auth user:", authError);
        // Don't throw - profile was already updated
      }
    }

    return NextResponse.json({ 
      user: updatedProfile, 
      message: "User updated successfully" 
    });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Prevent admin from deleting themselves
    if (user.id === id) {
      return NextResponse.json(
        { error: "Cannot delete your own account" },
        { status: 400 }
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 });
    }

    // Use admin client for admin operations
    const adminClient = createAdminClient();

    // Delete user from auth (will cascade to profiles due to FK)
    const { error } = await adminClient.auth.admin.deleteUser(id);

    if (error) throw error;

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}

