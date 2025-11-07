"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/lib/supabase/client";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formAnimation, setFormAnimation] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup states
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  // Password strength
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setLoginEmail("");
        setLoginPassword("");
        setSignupUsername("");
        setSignupEmail("");
        setSignupPassword("");
        setSignupConfirmPassword("");
        setShowPassword(false);
        setShowConfirmPassword(false);
        setActiveTab(defaultTab);
      }, 300);
    }
  }, [isOpen, defaultTab]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle tab switching with animation
  const handleTabSwitch = (tab: "login" | "signup") => {
    if (tab !== activeTab) {
      setFormAnimation(false);
      setTimeout(() => {
        setActiveTab(tab);
        setFormAnimation(true);
      }, 150);
    }
  };

  // Calculate password strength
  useEffect(() => {
    const password = activeTab === "signup" ? signupPassword : loginPassword;
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

    setPasswordStrength(Math.min(strength, 4));
  }, [signupPassword, loginPassword, activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You have been logged in successfully.",
      });

      onClose();
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
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
        email: signupEmail,
        password: signupPassword,
        options: {
          data: {
            username: signupUsername,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description:
          "Your account has been created. Please check your email to verify.",
      });

      // Switch to login tab after successful signup
      setActiveTab("login");
      setLoginEmail(signupEmail);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center font-display">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-300">
        <div className="relative flex flex-col items-center rounded-xl bg-[#1A1A1A]/95 p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-[#888888] hover:text-[#E0E0E0] hover:bg-white/5 transition-all"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          <div className="flex flex-col items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-[#4B5320] text-5xl">
              shield
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-[#E0E0E0]">
              {activeTab === "login" ? "Secure Access" : "Create Your Account"}
            </h1>
            <p className="text-sm text-[#888888]">
              Military Technology Reference Platform
            </p>
          </div>

          {/* Tabs */}
          <div className="flex w-full gap-2 mb-6 relative">
            <button
              onClick={() => handleTabSwitch("login")}
              disabled={loading}
              className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-lg transition-all duration-300 relative z-10 ${
                activeTab === "login"
                  ? "bg-[#4B5320] text-[#E0E0E0] shadow-lg shadow-[#4B5320]/20"
                  : "bg-white/5 text-[#888888] hover:bg-white/10"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">login</span>
                LOGIN
              </span>
            </button>
            <button
              onClick={() => handleTabSwitch("signup")}
              disabled={loading}
              className={`flex-1 py-2.5 px-4 text-sm font-bold rounded-lg transition-all duration-300 relative z-10 ${
                activeTab === "signup"
                  ? "bg-[#4B5320] text-[#E0E0E0] shadow-lg shadow-[#4B5320]/20"
                  : "bg-white/5 text-[#888888] hover:bg-white/10"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">person_add</span>
                SIGN UP
              </span>
            </button>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form
              onSubmit={handleLogin}
              className={`w-full space-y-5 transition-all duration-300 ${
                formAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <label className="flex flex-col flex-1">
                <p className="pb-2 text-sm font-medium text-[#E0E0E0]">
                  Email Address
                </p>
                <input
                  className="form-input flex w-full flex-1 resize-none overflow-hidden rounded-lg border border-white/20 bg-white/5 p-3.5 text-base text-[#E0E0E0] placeholder:text-[#888888] focus:border-[#4B5320] focus:outline-0 focus:ring-2 focus:ring-[#4B5320]/50 h-12"
                  placeholder="Enter your email address"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
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
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center justify-center rounded-r-lg border border-l-0 border-white/20 bg-white/5 px-3.5 text-[#888888] hover:text-[#E0E0E0] transition-all hover:bg-white/10"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </label>
              {loginPassword && passwordStrength > 0 && (
                <div className="flex items-center gap-2 px-1">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength
                            ? passwordStrength <= 1
                              ? "bg-red-500"
                              : passwordStrength <= 2
                              ? "bg-orange-500"
                              : passwordStrength <= 3
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#888888]">
                    {passwordStrength <= 1
                      ? "Weak"
                      : passwordStrength <= 2
                      ? "Fair"
                      : passwordStrength <= 3
                      ? "Good"
                      : "Strong"}
                  </span>
                </div>
              )}
              <div className="w-full mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#4B5320] px-5 text-base font-bold tracking-wider text-[#E0E0E0] transition-all duration-300 hover:bg-[#556B2F] hover:shadow-lg hover:shadow-[#4B5320]/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      LOADING...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 group-hover:gap-3 transition-all">
                      <span className="material-symbols-outlined text-xl">lock_open</span>
                      ACCESS
                    </span>
                  )}
                </button>
              </div>
              <div className="flex w-full justify-center mt-4">
                <a
                  className="text-sm text-[#888888] hover:text-[#E0E0E0] transition-colors"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === "signup" && (
            <form
              onSubmit={handleSignup}
              className={`w-full space-y-4 transition-all duration-300 ${
                formAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <label className="flex flex-col flex-1">
                <p className="pb-2 text-sm font-medium text-[#E0E0E0]">
                  Username
                </p>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 z-10">
                    <span className="material-symbols-outlined text-[#888888] text-xl">
                      person
                    </span>
                  </div>
                  <input
                    className="form-input h-12 w-full rounded-lg border border-white/20 bg-white/5 p-4 pl-12 text-base font-normal leading-normal text-[#E0E0E0] placeholder:text-[#888888] focus:border-[#4B5320] focus:outline-0 focus:ring-2 focus:ring-[#4B5320]/50"
                    placeholder="callsign_01"
                    type="text"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </label>
              <label className="flex flex-col flex-1">
                <p className="pb-2 text-sm font-medium text-[#E0E0E0]">
                  Email Address
                </p>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 z-10">
                    <span className="material-symbols-outlined text-[#888888] text-xl">
                      mail
                    </span>
                  </div>
                  <input
                    className="form-input h-12 w-full rounded-lg border border-white/20 bg-white/5 p-4 pl-12 text-base font-normal leading-normal text-[#E0E0E0] placeholder:text-[#888888] focus:border-[#4B5320] focus:outline-0 focus:ring-2 focus:ring-[#4B5320]/50"
                    placeholder="your.email@domain.com"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </label>
              <label className="flex flex-col flex-1">
                <p className="pb-2 text-sm font-medium text-[#E0E0E0]">Password</p>
                <div className="flex w-full flex-1 items-stretch">
                  <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 z-10">
                      <span className="material-symbols-outlined text-[#888888] text-xl">
                        lock
                      </span>
                    </div>
                    <input
                      className="form-input h-12 w-full rounded-l-lg border border-r-0 border-white/20 bg-white/5 p-4 pl-12 text-base font-normal leading-normal text-[#E0E0E0] placeholder:text-[#888888] focus:border-[#4B5320] focus:outline-0 focus:ring-2 focus:ring-[#4B5320]/50"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      disabled={loading}
                      minLength={6}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center justify-center rounded-r-lg border border-l-0 border-white/20 bg-white/5 px-3.5 text-[#888888] hover:text-[#E0E0E0] transition-all hover:bg-white/10"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </label>
              {signupPassword && passwordStrength > 0 && (
                <div className="flex items-center gap-2 px-1 -mt-2">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength
                            ? passwordStrength <= 1
                              ? "bg-red-500"
                              : passwordStrength <= 2
                              ? "bg-orange-500"
                              : passwordStrength <= 3
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[#888888]">
                    {passwordStrength <= 1
                      ? "Weak"
                      : passwordStrength <= 2
                      ? "Fair"
                      : passwordStrength <= 3
                      ? "Good"
                      : "Strong"}
                  </span>
                </div>
              )}
              <label className="flex flex-col flex-1">
                <p className="pb-2 text-sm font-medium text-[#E0E0E0]">
                  Confirm Password
                </p>
                <div className="flex w-full flex-1 items-stretch">
                  <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 z-10">
                      <span className="material-symbols-outlined text-[#888888] text-xl">
                        lock
                      </span>
                    </div>
                    <input
                      className="form-input h-12 w-full rounded-l-lg border border-r-0 border-white/20 bg-white/5 p-4 pl-12 text-base font-normal leading-normal text-[#E0E0E0] placeholder:text-[#888888] focus:border-[#4B5320] focus:outline-0 focus:ring-2 focus:ring-[#4B5320]/50"
                      placeholder="••••••••"
                      type={showConfirmPassword ? "text" : "password"}
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="flex items-center justify-center rounded-r-lg border border-l-0 border-white/20 bg-white/5 px-3.5 text-[#888888] hover:text-[#E0E0E0] transition-all hover:bg-white/10"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showConfirmPassword ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
              </label>
              {signupPassword && signupConfirmPassword && (
                <div className="flex items-center gap-2 px-1 -mt-1">
                  {signupPassword === signupConfirmPassword ? (
                    <div className="flex items-center gap-2 text-green-500">
                      <span className="material-symbols-outlined text-base">check_circle</span>
                      <span className="text-xs">Passwords match</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500">
                      <span className="material-symbols-outlined text-base">cancel</span>
                      <span className="text-xs">Passwords don't match</span>
                    </div>
                  )}
                </div>
              )}
              <div className="w-full mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#4B5320] px-5 text-base font-bold tracking-wider text-[#E0E0E0] transition-all duration-300 hover:bg-[#556B2F] hover:shadow-lg hover:shadow-[#4B5320]/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      CREATING ACCOUNT...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 group-hover:gap-3 transition-all">
                      <span className="material-symbols-outlined text-xl">person_add</span>
                      CREATE ACCOUNT
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 flex items-center gap-2 text-xs text-[#888888]">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>Secure Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
}

