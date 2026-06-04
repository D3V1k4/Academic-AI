import React from "react";
import {
  Flame,
  Clock3,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

import { getTimeGreeting } from "@/lib/utils";

import StatCard from "../components/StatCard";
import WeeklyStudyChart from "../components/WeeklyStudyChart";
import UpcomingExams from "../components/UpcomingExams";
import AIInsights from "../components/AIInsights";
import SubjectProgressChart from "../components/SubjectProgressChart";
import QuickActions from "../components/QuickActions";
import StudyHeatmap from "../components/StudyHeatmap";
import useDashboardData from "../hooks/useDashboardData";

export default function DashboardPage() {
  const {
  userName,
  stats,
  weeklyData,
  upcomingExams,
  isLoading,
  error,
} = useDashboardData();

  if (isLoading) {
    return (
      <div className="page-container text-white">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container text-red-500">
        Failed to load dashboard.
      </div>
    );
  }

  const dashboardStats = [
    {
      label: "Study Streak",
      value: `${stats?.studyStreak ?? 0} days`,
      icon: Flame,
      sub: "Keep it going!",
    },
    {
      label: "Hours Today",
      value: `${stats?.hoursToday ?? 0} hrs`,
      icon: Clock3,
      sub: "Today's progress",
    },
    {
      label: "Tasks Done",
      value: `${stats?.tasksCompleted ?? 0}/${stats?.tasksTotal ?? 0}`,
      icon: CheckCircle2,
      sub: "completed today",
    },
    {
      label: "Weekly Score",
      value: `${stats?.weeklyScore ?? 0}%`,
      icon: TrendingUp,
      sub: "performance",
    },
  ];

  return (
    <div className="page-container space-y-6">
      <div>
        <h2 className="section-heading">
          {getTimeGreeting()}, {userName} ☀️
        </h2>

        <p className="mt-2 text-muted">
          Here's your study snapshot for today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map(({ label, value, icon: Icon, sub }) => (
          <StatCard
            key={label}
            title={label}
            value={value}
            subtitle={sub}
            icon={Icon}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card variant="dark" padding="lg" className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              Weekly Progress
            </h3>

            <Badge variant="info">
              This Week
            </Badge>
          </div>

          <WeeklyStudyChart data={weeklyData} />
        </Card>

        <Card variant="dark" padding="lg" className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white">
            Upcoming Exams
          </h3>

          <div className="mt-4">
            <UpcomingExams exams={upcomingExams} />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card variant="dark" padding="lg">
          <h3 className="mb-4 text-xl font-semibold text-white">
            Subject Progress
          </h3>

          <SubjectProgressChart />
        </Card>

        <Card variant="dark" padding="lg">
          <h3 className="mb-4 text-xl font-semibold text-white">
            AI Insights
          </h3>

          <AIInsights />
        </Card>

        <Card variant="dark" padding="lg">
          <h3 className="mb-4 text-xl font-semibold text-white">
            Quick Actions
          </h3>

          <QuickActions />
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card variant="dark" padding="lg" className="lg:col-span-3">
          <StudyHeatmap />
        </Card>

        <Card variant="dark" padding="lg" className="lg:col-span-2">
          <h3 className="mb-4 text-xl font-semibold text-white">
            Academic Goals
          </h3>

          <div className="space-y-4">
            <p className="text-muted">
              Backend integration complete ✅
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}