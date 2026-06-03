import React from "react";
import { Flame, Clock3, CheckCircle2, TrendingUp, CalendarDays } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getTimeGreeting } from "@/lib/utils";

const stats = [
  { label: "Study Streak", value: "12 days", icon: Flame, sub: "Keep it going!" },
  { label: "Hours Today", value: "4.5 hrs", icon: Clock3, sub: "of 6 hr goal" },
  { label: "Tasks Done", value: "7 / 10", icon: CheckCircle2, sub: "completed today" },
  { label: "Weekly Score", value: "84%", icon: TrendingUp, sub: "vs last week" },
];

export default function DashboardPage() {
  return (
    <div className="page-container space-y-6">
      <div>
        <h2 className="section-heading">{getTimeGreeting()}, Student ☀️</h2>
        <p className="mt-2 text-muted">Here&apos;s your study snapshot for today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, sub }) => (
          <Card key={label} variant="dark" padding="md" className="border-l-4 border-primary">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted">{label}</p>
                <p className="mt-2 text-2xl font-bold text-white">{value}</p>
                <p className="mt-1 text-sm text-muted">{sub}</p>
              </div>
              <div className="rounded-xl bg-primary/15 p-3 text-primary">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card variant="dark" padding="lg" className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Weekly Progress</h3>
            <Badge variant="info">This week</Badge>
          </div>
          <div className="grid grid-cols-7 gap-3">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <div className={`h-28 w-full rounded-2xl ${i === 5 ? "bg-teal/70" : "bg-primary/70"}`} />
                <span className="text-sm text-muted">{day}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card variant="dark" padding="lg" className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white">Upcoming Exams</h3>
          <div className="mt-4 space-y-3">
            {[
              ["Data Structures", "3 days"],
              ["DBMS", "7 days"],
              ["OS", "12 days"],
            ].map(([subject, days]) => (
              <div key={subject} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{subject}</p>
                  <p className="text-sm text-muted">{days} remaining</p>
                </div>
                <Badge variant={Number(days) <= 3 ? "danger" : Number(days) <= 7 ? "warning" : "success"}>
                  {days}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card variant="dark" padding="lg" className="lg:col-span-3">
          <h3 className="text-xl font-semibold text-white">Today&apos;s Priority Tasks</h3>
          <div className="mt-4 space-y-3">
            {["Complete OS scheduling notes", "Revise DBMS joins", "Watch DSA trees video"].map((task) => (
              <div key={task} className="rounded-2xl border border-[color:var(--border)] bg-white/5 p-4">
                <p className="text-white">{task}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Button>View Full Planner</Button>
          </div>
        </Card>

        <Card variant="dark" padding="lg" className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white">Current Streak</h3>
          <div className="mt-4 grid grid-cols-6 gap-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className={`h-8 rounded-lg ${i < 12 ? "bg-primary" : "bg-navy/50 border border-[color:var(--border)]"}`} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
