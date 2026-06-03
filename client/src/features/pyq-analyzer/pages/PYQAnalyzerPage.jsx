import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function PYQAnalyzerPage() {
  return (
    <div className="page-container space-y-6">
      <div>
        <h2 className="section-heading">Previous Year Question Paper Analyzer</h2>
        <p className="mt-2 text-muted">Upload a paper to see repeated topics and important questions.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="dark" padding="lg">
          <div className="rounded-2xl border border-dashed border-primary/40 bg-white/5 p-8 text-center">
            <p className="text-white">Drop your PDF here</p>
            <p className="mt-2 text-sm text-muted">PDF only, max 10MB</p>
          </div>
          <div className="mt-4">
            <Button>Upload PYQ</Button>
          </div>
        </Card>

        <Card variant="dark" padding="lg">
          <h3 className="text-xl font-semibold text-white">Analysis Results</h3>
          <div className="mt-4 space-y-3">
            {["Most Asked Topics", "Unit-wise Weightage", "Important Questions"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/5 p-4 text-white">{item}</div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
