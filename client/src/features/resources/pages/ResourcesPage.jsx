import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ResourcesPage() {
  const resources = ["OS Scheduling Explained", "DBMS Joins in 10 Minutes", "Trees and Graphs Crash Course"];

  return (
    <div className="page-container space-y-6">
      <div>
        <h2 className="section-heading">Resources</h2>
        <p className="mt-2 text-muted">Watch the right concepts at the right time.</p>
      </div>

      <Card variant="dark" padding="lg">
        <input className="input-base" placeholder="Search resources..." />
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {resources.map((title) => (
          <Card key={title} variant="dark" padding="md">
            <div className="h-40 rounded-2xl bg-white/5" />
            <p className="mt-4 text-white">{title}</p>
            <div className="mt-4">
              <Button size="sm">Watch Now</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
