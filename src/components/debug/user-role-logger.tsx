"use client";

import { useUserRole } from "@/hooks/use-user-role";
import { useEffect } from "react";

export function UserRoleLogger() {
  const { user, role, isAdmin, loading } = useUserRole();

  useEffect(() => {
    if (!loading) {
      console.log("=".repeat(50));
      console.log("🔍 USER ROLE DEBUG INFO");
      console.log("=".repeat(50));
      
      if (user) {
        console.table({
          "User ID": user.id,
          "Email": user.email,
          "Role": role || "not set",
          "Is Admin": isAdmin ? "YES" : "NO",
          "Created At": user.created_at,
        });
        
        console.log(`\n📊 Role Status: ${role === "admin" ? "🔴 ADMIN" : "🟢 USER"}\n`);
        console.log("=".repeat(50));
      } else {
        console.log("❌ No authenticated user");
        console.log("=".repeat(50));
      }
    }
  }, [user, role, isAdmin, loading]);

  // This component doesn't render anything
  return null;
}

