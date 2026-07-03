"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, AlertCircle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simple demo authentication check
    setTimeout(() => {
      if (email === "admin@enginx.com" && password === "password123") {
        // Set cookie session
        document.cookie = "enginx_session=authenticated; path=/; max-age=86400; SameSite=Strict";
        router.push("/dashboard");
      } else {
        setError("Invalid email or password. Use admin@enginx.com / password123");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-gray-950 via-[#021128] to-blue-950 text-white flex flex-col justify-center items-center p-4 overflow-hidden font-varela-round">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-32 w-[24rem] h-[24rem] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 rounded-full filter blur-3xl opacity-10 animate-blob-float"></div>
      <div className="absolute bottom-1/4 -right-32 w-[24rem] h-[24rem] bg-gradient-to-tr from-yellow-400 via-pink-500 to-red-500 rounded-full filter blur-3xl opacity-10 animate-blob-float animation-delay-4000"></div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Link href="/">
            <Image
              src="/engin.png"
              alt="Enginx Logo"
              width={160}
              height={40}
              className="h-10 w-auto object-contain mb-6 hover:scale-105 transition-transform duration-200"
              priority
            />
          </Link>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Welcome back</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Sign in to access your administrative dashboard
          </p>
        </div>

        <div className="bg-[#0c2546]/70 border border-[#163b6b]/60 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center space-x-2.5">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="leading-snug">{error}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-neutral-300 tracking-wider uppercase">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#071a35] text-white placeholder-neutral-500 rounded-2xl border border-[#163b6b]/60 focus:ring-2 focus:ring-[#8dbef8] focus:border-[#8dbef8] outline-none transition-all duration-200 text-sm"
                  placeholder="admin@enginx.com"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-xs font-semibold text-neutral-300 tracking-wider uppercase">
                  Password
                </label>
                <Link href="#" className="text-xs text-[#8dbef8] hover:text-blue-300 transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 bg-[#071a35] text-white placeholder-neutral-500 rounded-2xl border border-[#163b6b]/60 focus:ring-2 focus:ring-[#8dbef8] focus:border-[#8dbef8] outline-none transition-all duration-200 text-sm"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4.5 w-4.5 bg-[#071a35] text-[#8dbef8] border-[#163b6b]/60 rounded focus:ring-[#8dbef8] focus:ring-offset-[#0c2546] focus:ring-2"
                />
                <label htmlFor="remember-me" className="ml-2.5 block text-sm text-neutral-300 select-none cursor-pointer">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 disabled:opacity-50 text-[#021128] font-bold py-3.5 rounded-2xl transition-all duration-200 flex items-center justify-center cursor-pointer shadow-lg tracking-wide mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-[#021128]" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-neutral-500">
          Demo Admin Credentials: <code className="text-neutral-400">admin@enginx.com</code> / <code className="text-neutral-400">password123</code>
        </p>
      </div>
    </div>
  );
}
