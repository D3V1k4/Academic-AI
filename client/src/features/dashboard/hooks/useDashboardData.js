import { useEffect, useState } from "react";
import dashboardService from "@/services/dashboardService";

export default function useDashboardData() {
  const [stats, setStats] = useState(null);
  const [userName, setUserName] = useState("");
  const [weeklyData, setWeeklyData] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setIsLoading(true);

        const response = await dashboardService.getOverview();
        const data = response.data.data;

        setUserName(data.userName || "Student");

        setStats({
          studyStreak: data.studyStreak,
          hoursToday: data.hoursToday,
          tasksCompleted: data.tasksCompleted,
          tasksTotal: data.tasksTotal,
          weeklyScore: data.weeklyScore,
        });

        setWeeklyData(data.weeklyHours || []);
        setUpcomingExams(data.upcomingExams || []);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return {
    userName,
    stats,
    weeklyData,
    upcomingExams,
    isLoading,
    error,
  };
}
