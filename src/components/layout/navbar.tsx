"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNavClient } from "./user-nav-client";
import { Shield } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/providers/language-provider";
import { useUserRole } from "@/hooks/use-user-role";

export function Navbar() {
  const { t } = useLanguage();
  const { user, role, isAdmin } = useUserRole();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <Shield className="h-6 w-6" />
          <span className="font-bold text-xl">Military DB</span>
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          <Link
            href="/countries"
            className="transition-colors hover:text-foreground/80"
          >
            {t.nav.countries}
          </Link>
          <Link
            href="/weapons"
            className="transition-colors hover:text-foreground/80"
          >
            {t.nav.weapons}
          </Link>
          <Link
            href="/armies"
            className="transition-colors hover:text-foreground/80"
          >
            {t.nav.armies}
          </Link>
          <Link
            href="/relations"
            className="transition-colors hover:text-foreground/80"
          >
            {t.nav.relations}
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <LanguageToggle />
          {user ? (
            <UserNavClient user={user} />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">{t.nav.login}</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">{t.nav.signup}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
