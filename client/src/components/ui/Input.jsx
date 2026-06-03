import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const Input = forwardRef(function Input(
  {
    label,
    error,
    className = "",
    type = "text",
    wrapperClassName = "",
    showPasswordToggle = false,
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const actualType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      {label ? <label className="block text-sm font-medium text-white">{label}</label> : null}

      <div className="relative">
        <input
          ref={ref}
          type={actualType}
          className={cn(
            "input-base",
            showPasswordToggle ? "pr-11" : "",
            error ? "border-coral focus:border-coral focus:ring-coral/30" : "",
            className
          )}
          {...props}
        />

        {showPasswordToggle ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-primary"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        ) : null}
      </div>

      {error ? <p className="text-sm text-coral">{error}</p> : null}
    </div>
  );
});

export default Input;