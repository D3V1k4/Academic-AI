import React from "react";
import Card from "@/components/ui/Card";

export default function AnalyticsPage() {
  return (
    <div className="page-container space-y-6">
      <div>
        <h2 className="section-heading">Your Performance Analytics</h2>
        <p className="mt-2 text-muted">A simple view of how your study pattern is trending.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {["Avg Daily Hours", "Completion Rate", "Consistency Score", "Productivity Index"].map((item) => (
          <Card key={item} variant="dark" padding="md">
            <p className="text-sm text-muted">{item}</p>
            <p className="mt-2 text-2xl font-bold text-white">78%</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="dark" padding="lg">
          <h3 className="text-xl font-semibold text-white">Productivity Trends</h3>
          <div className="mt-4 h-64 rounded-2xl bg-white/5" />
        </Card>
        <Card variant="dark" padding="lg">
          <h3 className="text-xl font-semibold text-white">Subject Analysis</h3>
          <div className="mt-4 h-64 rounded-2xl bg-white/5" />
        </Card>
      </div>
    </div>
  );
}
