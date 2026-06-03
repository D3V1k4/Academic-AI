import React from "react";
import Card from "@/components/ui/Card";

export default function AIAssistantPage() {
  return (
    <div className="page-container">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card variant="dark" padding="lg" className="lg:col-span-1">
          <h3 className="text-xl font-semibold text-white">AI Context</h3>
          <div className="mt-4 space-y-3">
            {["Semester 5 • CSE", "Focus: OS, DBMS", "Weak topics: Scheduling"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/5 p-4 text-sm text-white">{item}</div>
            ))}
          </div>
        </Card>

        <Card variant="dark" padding="lg" className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white">Chat Assistant</h3>
          <div className="mt-4 min-h-[420px] rounded-2xl bg-white/5 p-4 text-muted">
            Ask me anything about your subjects, revision, or study plan.
          </div>
        </Card>
      </div>
    </div>
  );
}
