import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  ...props
}) {
  const variants = {
    primary: "bg-primary text-navy hover:bg-amber shadow-glow",
    secondary: "bg-surface text-white border border-[color:var(--border)] hover:bg-surface/90",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
    danger: "bg-coral text-white hover:opacity-90",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      <span>{children}</span>
    </button>
  );
}
