import React from "react";

export default function SkeletonCard({ className = "" }) {
  return (
    <div className={`card-dark animate-pulseSoft p-6 ${className}`}>
      <div className="space-y-4">
        <div className="h-4 w-1/3 rounded bg-white/10" />
        <div className="h-3 w-2/3 rounded bg-white/10" />
        <div className="h-3 w-5/6 rounded bg-white/10" />
        <div className="h-24 rounded-2xl bg-white/10" />
      </div>
    </div>
  );
}
