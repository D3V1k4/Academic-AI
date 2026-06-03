import React from "react";
import { cn } from "@/lib/utils";

export default function Card({
  variant = "dark",
  padding = "md",
  header = null,
  className = "",
  children,
  ...props
}) {
  const variants = {
    dark: "card-dark",
    light: "card-light",
  };

  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-glow",
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {header ? <div className="mb-4 border-t-4 border-amber pt-3">{header}</div> : null}
      {children}
    </div>
  );
}
