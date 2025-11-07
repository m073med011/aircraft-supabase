"use client";

import { useUserRole } from "@/hooks/use-user-role";
import { Shield, User } from "lucide-react";

export function RoleIndicator() {
  const { user, role, isAdmin, loading } = useUserRole();

  if (loading || !user) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg ${
          isAdmin
            ? "bg-red-500 text-white"
            : "bg-blue-500 text-white"
        }`}
      >
        {isAdmin ? (
          <Shield className="h-4 w-4" />
        ) : (
          <User className="h-4 w-4" />
        )}
        <span className="text-sm font-semibold uppercase">
          {role}
        </span>
      </div>
    </div>
  );
}

