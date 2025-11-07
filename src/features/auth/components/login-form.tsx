"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You have been logged in successfully.",
      });

      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#121212] bg-cover bg-center bg-no-repeat font-display"
      style={{
        backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2PR93OmZdCzsihOMav8vZTr4-Z6rLTlETryQcjvaTOCdyXJrcPpykU1xAZfWEbdRSfrtJLmgCq-9257nykC_5Lj5J16ciW0i85YrDvrjgcm6dRe4Zt3wU27ejP4sj7Gce9uK0fNCHmAf2ZXV3bJ2MIBFfwaGZf_bH0SrWmwOVgDfKbShUa4yg5Q9edjAObwoh87ffZfHPBQRN9eLUTtcniFhmrjbtbIFUTgtoVMyafblp5F1FzfKrC7G0dfqD-6gWZkCZT4qz-2Y')`
      }}
    >
      <div className="absolute inset-0 bg-[#121212]/70 backdrop-blur-sm"></div>
      <div className="relative z-10 flex w-full max-w-md flex-col items-center rounded-xl bg-[#1A1A1A]/80 p-6 sm:p-8 md:p-10 border border-white/10 mx-4">
        <div className="flex flex-col items-center gap-2 mb-8">
          <span className="material-symbols-outlined text-[#4B5320] text-5xl">
            shield
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-[#E0E0E0]">
            Secure Access
          </h1>
          <p className="text-sm text-[#888888]">
            Military Technology Reference Platform
          </p>
        </div>
        <form onSubmit={handleEmailLogin} className="w-full space-y-5">
          <label className="flex flex-col flex-1">
            <p className="pb-2 text-sm font-medium text-[#E0E0E0]">
              Email Address
            </p>
            <input
              className="form-input flex w-full flex-1 resize-none overflow-hidden rounded-lg border border-white/20 bg-white/5 p-3.5 text-base text-[#E0E0E0] placeholder:text-[#888888] focus:border-[#4B5320] focus:outline-0 focus:ring-2 focus:ring-[#4B5320]/50 h-12"
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </label>
          <label className="flex flex-col flex-1">
            <p className="pb-2 text-sm font-medium text-[#E0E0E0]">Password</p>
            <div className="flex w-full flex-1 items-stretch">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg border border-r-0 border-white/20 bg-white/5 p-3.5 text-base text-[#E0E0E0] placeholder:text-[#888888] focus:border-[#4B5320] focus:outline-0 focus:ring-2 focus:ring-[#4B5320]/50 h-12"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center justify-center rounded-r-lg border border-l-0 border-white/20 bg-white/5 px-3.5 text-[#888888] hover:text-[#E0E0E0] transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </label>
          <div className="w-full mt-8">
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#4B5320] px-5 text-base font-bold tracking-wider text-[#E0E0E0] transition-colors hover:bg-[#556B2F] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="truncate">
                {loading ? "LOADING..." : "ACCESS"}
              </span>
            </button>
          </div>
        </form>
        <div className="flex w-full justify-between mt-6">
          <a
            className="text-sm text-[#888888] hover:text-[#E0E0E0] transition-colors"
            href="#"
          >
            Forgot Password?
          </a>
          <Link
            href="/auth/register"
            className="text-sm text-[#888888] hover:text-[#E0E0E0] transition-colors"
          >
            Don't have an account?{" "}
            <span className="font-semibold text-[#E0E0E0]">Sign Up</span>
          </Link>
        </div>
        <div className="mt-8 flex items-center gap-2 text-xs text-[#888888]">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span>Secure Connection</span>
        </div>
      </div>
    </div>
  );
}

