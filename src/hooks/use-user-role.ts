"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export function useUserRole() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"user" | "admin" | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadUserRole() {
      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        setUser(user);

        if (user) {
          // Get user profile with role
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

          if (error) {
            console.error("❌ Error fetching user role:", error);
          } else {
            console.log("👤 User Info:", {
              id: user.id,
              email: user.email,
              role: profile?.role,
              created_at: user.created_at,
            });
            console.log("🔐 User Role:", profile?.role);
            setRole(profile?.role || null);
          }
        } else {
          console.log("❌ No user logged in");
        }
      } catch (error) {
        console.error("❌ Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUserRole();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadUserRole();
      } else {
        console.log("❌ User logged out");
        setUser(null);
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return { user, role, loading, isAdmin: role === "admin" };
}
