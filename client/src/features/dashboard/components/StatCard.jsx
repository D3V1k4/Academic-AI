import React from "react";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}) {
  return (
    <div className="card-dark border-l-4 border-primary p-5 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        </div>

        <div className="rounded-xl bg-primary/15 p-3 text-primary">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
