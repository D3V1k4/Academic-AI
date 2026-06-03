import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function FutureSelfPage() {
  return (
    <div className="page-container space-y-6">
      <div>
        <h2 className="section-heading">Your Future Academic Journey</h2>
        <p className="mt-2 text-muted">See how your study habits shape your future.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="dark" padding="lg">
          <h3 className="text-xl font-semibold text-white">If you continue as-is</h3>
          <p className="mt-4 text-muted">Projected GPA: 7.4</p>
          <Badge variant="danger" className="mt-4">At Risk</Badge>
        </Card>

        <Card variant="light" padding="lg">
          <h3 className="text-xl font-semibold text-navy">If you study 2 more hours/day</h3>
          <p className="mt-4 text-navy/70">Projected GPA: 8.6</p>
          <Badge variant="success" className="mt-4">Recommended</Badge>
        </Card>
      </div>
    </div>
  );
}
