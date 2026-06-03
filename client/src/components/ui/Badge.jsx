import React from "react";
import { cn } from "@/lib/utils";

export default function Badge({ variant = "neutral", className = "", children, ...props }) {
  const variants = {
    success: "border-teal/30 bg-teal/20 text-teal",
    warning: "border-amber/30 bg-amber/20 text-amber",
    danger: "border-coral/30 bg-coral/20 text-coral",
    info: "border-primary/30 bg-primary/20 text-primary",
    neutral: "border-white/20 bg-white/10 text-white",
  };

  return (
    <span
      className={cn("badge-base", variants[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
