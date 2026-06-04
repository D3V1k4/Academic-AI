import React from "react";

export default function AIInsights() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
        <h4 className="font-semibold text-white">
          AI Recommendation
        </h4>

        <p className="mt-3 text-sm text-muted">
          Focus on Operating Systems today. Your progress is behind schedule.
        </p>
      </div>

      <div className="rounded-2xl bg-white/5 p-4">
        <p className="text-sm text-muted">Strongest Subject</p>
        <p className="mt-2 text-lg font-semibold text-teal">
          Data Structures
        </p>
      </div>

      <div className="rounded-2xl bg-white/5 p-4">
        <p className="text-sm text-muted">Needs Attention</p>
        <p className="mt-2 text-lg font-semibold text-coral">
          Operating Systems
        </p>
      </div>
    </div>
  );
}
