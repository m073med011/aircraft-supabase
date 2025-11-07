"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your account has been created. Please check your email to verify.",
      });

      router.push("/auth/login");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 bg-[#111827] font-display">
      <div className="absolute inset-0 z-0">
        <img
          alt="Abstract wireframe grid pattern"
          className="h-full w-full object-cover opacity-10 dark:opacity-5"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnaaTj6ISz4c93EqhMw6ETAl9PbSXTHivCqQi7gJxTwSgB3xjIYdKXbjPr2WDfCoT5oPrQy_tTi4Brc_EbktdS2isCKEYfzwvjn2eaLERcE6LPigAMkWFv99rnQ7TMUnEuYj1pZ1iVzhYYX83o3pi2VPgoSj9UF56r36KJR7Exlyeo0rfL3gfpGeK9c0ZkNBvB3ZkAwpupT3q1UXSmBR8N0govilLhiwlv_UyRDkMyYlEZ-jpzLMORolKQziHQSTPQvJaQOiMYrzg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/80 to-transparent"></div>
      </div>
      <main className="relative z-10 flex w-full max-w-md flex-col items-center">
        <header className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center gap-3">
            <svg className="size-8 text-[#5bec13]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
            <h1 className="text-3xl font-bold tracking-tighter text-white">INTEL-X</h1>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold leading-tight tracking-tighter text-white">
              Create Your Account
            </p>
            <p className="text-base font-normal leading-normal text-gray-400">
              Join the leading platform for military technology insights.
            </p>
          </div>
        </header>
        <form onSubmit={handleRegister} className="flex w-full flex-col gap-6">
          <div className="relative">
            <label className="sr-only" htmlFor="username">
              Username
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="material-symbols-outlined text-gray-400">person</span>
            </div>
            <input
              className="form-input h-14 w-full rounded-lg border-none bg-black/30 p-4 pl-12 text-base font-normal leading-normal text-white placeholder:text-gray-500 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#5bec13]"
              id="username"
              name="username"
              placeholder="callsign_01"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="relative">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="material-symbols-outlined text-gray-400">mail</span>
            </div>
            <input
              className="form-input h-14 w-full rounded-lg border-none bg-black/30 p-4 pl-12 text-base font-normal leading-normal text-white placeholder:text-gray-500 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#5bec13]"
              id="email"
              name="email"
              placeholder="your.email@domain.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="relative">
            <label className="sr-only" htmlFor="password">
              Password
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="material-symbols-outlined text-gray-400">lock</span>
            </div>
            <input
              className="form-input h-14 w-full rounded-lg border-none bg-black/30 p-4 pl-12 text-base font-normal leading-normal text-white placeholder:text-gray-500 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#5bec13]"
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>
          <div className="relative">
            <label className="sr-only" htmlFor="confirm-password">
              Confirm Password
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <span className="material-symbols-outlined text-gray-400">lock</span>
            </div>
            <input
              className="form-input h-14 w-full rounded-lg border-none bg-black/30 p-4 pl-12 text-base font-normal leading-normal text-white placeholder:text-gray-500 ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#5bec13]"
              id="confirm-password"
              name="confirm-password"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex h-14 items-center justify-center rounded-lg bg-[#5bec13] px-6 py-3 text-base font-bold text-gray-900 transition-colors hover:bg-[#5bec13]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5bec13] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-[#5bec13] hover:text-[#5bec13]/90">
            Log In
          </Link>
        </p>
      </main>
    </div>
  );
}

