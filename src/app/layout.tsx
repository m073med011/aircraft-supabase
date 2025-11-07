import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NavbarDefTech } from "@/components/layout/navbar-deftech";
import { FooterDefTech } from "@/components/layout/footer-deftech";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { UserRoleLogger } from "@/components/debug/user-role-logger";
import { RoleIndicator } from "@/components/debug/role-indicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Military Database",
  description:
    "Comprehensive database of global military information, weapons, and defense systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <UserRoleLogger />
            <RoleIndicator />
            <NavbarDefTech />
            <main className="min-h-screen bg-[#1F1F1F]">{children}</main>
            <FooterDefTech />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
