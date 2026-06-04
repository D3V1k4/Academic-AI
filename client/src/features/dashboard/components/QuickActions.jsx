import React from "react";

const actions = [
  "Open Planner",
  "Ask AI",
  "Upload PYQ",
  "Study Session",
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => (
        <button
          key={action}
          className="rounded-2xl border border-primary/20 bg-white/5 p-4 transition-all hover:bg-primary/10"
        >
          <p className="text-sm text-white">
            {action}
          </p>
        </button>
      ))}
    </div>
  );
}
