import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { loginSchema } from "@/lib/validators";
import useAuthStore from "@/store/authStore";

export default function LoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const isLoading = useAuthStore((s) => s.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (values) => {
    try {
      await login(values);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-[color:var(--border)] bg-surface p-6 shadow-glow">
      <Input label="Email" type="email" placeholder="you@example.com" error={errors.email?.message} {...register("email")} />
      <Input label="Password" type="password" placeholder="Enter your password" error={errors.password?.message} showPasswordToggle {...register("password")} />

      <div className="flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" className="h-4 w-4 rounded border-[color:var(--border)] bg-transparent accent-[var(--color-primary)]" {...register("rememberMe")} />
          Remember me
        </label>

        <button type="button" className="text-sm text-primary hover:text-amber">
          Forgot password?
        </button>
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full" loading={isLoading}>
        Log In
      </Button>
    </form>
  );
}
