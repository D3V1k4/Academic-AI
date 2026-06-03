import React from "react";
import { Clock3, Filter, RefreshCcw } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function PlannerPage() {
  const tasks = [
    { subject: "OS", topic: "CPU Scheduling", priority: "High" },
    { subject: "DBMS", topic: "Normalization", priority: "Medium" },
    { subject: "DSA", topic: "Trees", priority: "Low" },
  ];

  return (
    <div className="page-container space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="section-heading">Daily Planner</h2>
          <p className="mt-2 text-muted">Plan your day and focus on the most important work first.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary"><Clock3 className="h-4 w-4" /> Today</Button>
          <Button variant="secondary"><RefreshCcw className="h-4 w-4" /> Refresh</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card variant="dark" padding="lg" className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Today&apos;s Tasks</h3>
            <Button variant="ghost" size="sm"><Filter className="h-4 w-4" /> Filter</Button>
          </div>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.topic} className="rounded-2xl border border-[color:var(--border)] bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted">{task.subject}</p>
                    <p className="text-lg font-medium text-white">{task.topic}</p>
                  </div>
                  <Badge variant={task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "success"}>
                    {task.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="dark" padding="lg">
          <h3 className="text-xl font-semibold text-white">Revision Schedule</h3>
          <div className="mt-4 space-y-3">
            {["OS — Semaphore", "DBMS — Keys", "CN — Routing"].map((item) => (
              <div key={item} className="rounded-2xl bg-white/5 p-4 text-white">{item}</div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
