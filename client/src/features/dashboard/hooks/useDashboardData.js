import React from "react";
import Card from "@/components/ui/Card";

export default function useDashboardData() {
  return {
    stats: [],
    weeklyData: [],
    upcomingExams: [],
    todaysTasks: [],
    isLoading: false,
    error: null,
  };
}
