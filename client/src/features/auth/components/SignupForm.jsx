import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { BRANCHES, SEMESTERS } from "@/lib/constants";
import { signupSchema } from "@/lib/validators";
import useAuthStore from "@/store/authStore";

function StrengthBar({ password }) {
  const score = Math.min(4, [
    password?.length >= 6,
    /[A-Z]/.test(password || ""),
    /[0-9]/.test(password || ""),
    /[^A-Za-z0-9]/.test(password || ""),
  ].filter(Boolean).length);

  const labels = ["Weak", "Fair", "Good", "Strong"];
  return (
    <div className="space-y-2">
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-2 rounded-full bg-primary transition-all duration-300" style={{ width: `${(score / 4) * 100}%` }} />
      </div>
      <p className="text-xs text-muted">Password strength: {labels[Math.max(score - 1, 0)] || "Weak"}</p>
    </div>
  );
}

export default function SignupForm() {
  const navigate = useNavigate();
  const signup = useAuthStore((s) => s.signup);
  const isLoading = useAuthStore((s) => s.isLoading);

  const {
    register,
    handleSubmit,
    watch: watchField,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      branch: BRANCHES[0],
      semester: 1,
      enrollmentNumber: "",
    },
  });

  const password = watchField("password");

  const onSubmit = async (values) => {
    try {
      await signup(values);
      toast.success("Account created");
      navigate("/onboarding");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-[color:var(--border)] bg-surface p-6 shadow-glow">
      <Input label="Full Name" placeholder="Your name" error={errors.fullName?.message} {...register("fullName")} />
      <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register("email")} />
      <Input label="Password" type="password" placeholder="Create a password" error={errors.password?.message} showPasswordToggle {...register("password")} />
      <StrengthBar password={password} />
      <Input label="Confirm Password" type="password" placeholder="Re-enter password" error={errors.confirmPassword?.message} showPasswordToggle {...register("confirmPassword")} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Branch</label>
          <select className="input-base" {...register("branch")}>
            {BRANCHES.map((branch) => (
              <option key={branch} value={branch} className="text-navy">
                {branch}
              </option>
            ))}
          </select>
          {errors.branch?.message ? <p className="text-sm text-coral">{errors.branch.message}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Semester</label>
          <select className="input-base" {...register("semester", { valueAsNumber: true })}>
            {SEMESTERS.map((sem) => (
              <option key={sem} value={sem} className="text-navy">
                Semester {sem}
              </option>
            ))}
          </select>
          {errors.semester?.message ? <p className="text-sm text-coral">{errors.semester.message}</p> : null}
        </div>
      </div>

      <Input label="Enrollment Number" placeholder="Enrollment number" error={errors.enrollmentNumber?.message} {...register("enrollmentNumber")} />

      <Button type="submit" variant="primary" size="lg" className="w-full" loading={isLoading}>
        Create Account
      </Button>
    </form>
  );
}
