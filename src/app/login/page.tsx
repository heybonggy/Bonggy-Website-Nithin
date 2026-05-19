import { useState } from "react";
import { Link } from "react-router";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { BonggyMark } from "@/components/BonggyMark";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-bonggy-bg flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <BonggyMark size={40} />
          <span className="text-[22px] font-semibold text-bonggy-text-primary tracking-tight">Bonggy</span>
        </div>

        <div className="bg-bonggy-surface border border-bonggy-border rounded-2xl p-8">
          <h1 className="text-[22px] font-semibold text-bonggy-text-primary text-center mb-1">
            Welcome back
          </h1>
          <p className="text-[14px] text-bonggy-text-secondary text-center mb-6">
            Sign in to your workspace
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="text-[12px] text-bonggy-text-secondary mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-bonggy-border bg-bonggy-bg text-[14px] text-bonggy-text-primary placeholder:text-bonggy-text-tertiary outline-none focus:border-bonggy-text-primary transition-colors"
              />
            </div>

            <div>
              <label className="text-[12px] text-bonggy-text-secondary mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-bonggy-border bg-bonggy-bg text-[14px] text-bonggy-text-primary placeholder:text-bonggy-text-tertiary outline-none focus:border-bonggy-text-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-bonggy-text-tertiary hover:text-bonggy-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-bonggy-border" />
                <span className="text-[12px] text-bonggy-text-secondary">Remember me</span>
              </label>
              <a href="#" className="text-[12px] text-bonggy-accent hover:underline">
                Forgot password?
              </a>
            </div>

            <Link
              href="/app"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-bonggy-text-primary text-bonggy-surface text-[14px] font-medium hover:opacity-85 transition-opacity"
            >
              Sign In <ArrowRight size={14} />
            </Link>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-bonggy-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-bonggy-surface text-[11px] text-bonggy-text-tertiary uppercase tracking-wide">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-secondary hover:border-bonggy-border-hover transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path fill="#4285F4" d="M14.9 8.2c0-.5-.1-1-.2-1.4H8v2.7h3.9c-.2 1-1 2.3-2.8 2.3-1.7 0-3-1.1-3.5-2.6H3.3v1.7C4.3 13 6 14.3 8 14.3c2.3 0 4.2-1.5 4.9-3.5v-2.6z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-bonggy-border bg-bonggy-bg text-[13px] text-bonggy-text-secondary hover:border-bonggy-border-hover transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              GitHub
            </button>
          </div>
        </div>

        <p className="text-center text-[13px] text-bonggy-text-secondary mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-bonggy-accent hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
