import React from "react";

const days = Array.from({ length: 84 }, (_, i) => ({
  id: i,
  level: Math.floor(Math.random() * 5),
}));

const colors = [
  "bg-white/5",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/70",
  "bg-primary",
];

export default function StudyHeatmap() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-semibold text-white">
          Study Activity
        </h4>

        <span className="text-xs text-muted">
          Last 12 Weeks
        </span>
      </div>

      <div className="grid grid-cols-12 gap-1">
        {days.map((day) => (
          <div
            key={day.id}
            className={`h-4 w-4 rounded-sm ${colors[day.level]}`}
            title={`Study intensity ${day.level}`}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted">
        <span>Less</span>
        {colors.map((color) => (
          <div key={color} className={`h-3 w-3 rounded-sm ${color}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
