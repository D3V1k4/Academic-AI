import React from "react";
import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ size = "md", center = false }) {
  const sizes = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  return (
    <div className={center ? "flex items-center justify-center py-10" : ""}>
      <Loader2 className={`${sizes[size]} animate-spin text-primary`} />
    </div>
  );
}
