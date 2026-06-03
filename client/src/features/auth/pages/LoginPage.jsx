import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "@/features/auth/components/LoginForm";

function StudyIllustration() {
  return (
    <svg viewBox="0 0 400 350" className="w-full max-w-[440px]" aria-hidden="true">
      <rect x="50" y="65" width="300" height="220" rx="32" fill="#F0F0F0" />
      <rect x="90" y="105" width="140" height="92" rx="18" fill="#1A1A2E" />
      <rect x="105" y="120" width="110" height="14" rx="7" fill="#4ECDC4" />
      <rect x="105" y="146" width="92" height="10" rx="5" fill="#F5C842" />
      <rect x="105" y="165" width="78" height="10" rx="5" fill="#E8A020" />
      <circle cx="260" cy="130" r="32" fill="#2D2D4E" />
      <rect x="248" y="168" width="24" height="42" rx="10" fill="#1A1A2E" />
      <rect x="130" y="208" width="90" height="52" rx="14" fill="#2D2D4E" />
      <rect x="138" y="217" width="74" height="10" rx="5" fill="#F5C842" />
      <rect x="138" y="235" width="54" height="8" rx="4" fill="#4ECDC4" />
      <rect x="226" y="212" width="34" height="74" rx="10" fill="#1A1A2E" />
      <rect x="266" y="196" width="36" height="90" rx="10" fill="#1A1A2E" />
      <rect x="306" y="186" width="28" height="100" rx="10" fill="#1A1A2E" />
      <circle cx="115" cy="92" r="18" fill="#E8A020" />
      <circle cx="308" cy="92" r="14" fill="#4ECDC4" />
      <circle cx="320" cy="58" r="10" fill="#F5C842" />
      <rect x="70" y="240" width="58" height="16" rx="8" fill="#E8A020" />
      <rect x="240" y="54" width="52" height="16" rx="8" fill="#4ECDC4" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <section className="flex items-center justify-center bg-primary px-6 py-10 text-navy">
        <div className="w-full max-w-xl space-y-8">
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-bold md:text-6xl">AcademicAI</h1>
            <p className="max-w-lg text-lg font-medium md:text-2xl">
              Your AI Study Companion for Engineering Success
            </p>
          </div>

          <div className="flex justify-center">
            <StudyIllustration />
          </div>

          <div className="rounded-2xl bg-cardwhite p-6 text-navy shadow-glow">
            <p className="text-lg font-medium">
              “A goal without a plan is just a wish.”
            </p>
            <p className="mt-2 text-sm text-navy/70">— Antoine de Saint-Exupéry</p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-navy px-6 py-10">
        <div className="w-full max-w-lg">
          <div className="mb-8 space-y-2">
            <h2 className="font-display text-3xl font-bold text-white">Welcome back 👋</h2>
            <p className="text-muted">Log in to continue your academic journey.</p>
          </div>

          <LoginForm />

          <p className="mt-6 text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-medium text-primary hover:text-amber">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
