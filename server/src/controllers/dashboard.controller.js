const User = require("../models/User.model");
const DailyPlan = require("../models/DailyPlan.model");
const StudySession = require("../models/StudySession.model");

exports.getOverview = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    const today = new Date();

    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const sessions = await StudySession.find({
      userId,
      startTime: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    const totalMinutes = sessions.reduce(
      (sum, session) => sum + session.duration,
      0
    );

    const hoursToday = Number(
      (totalMinutes / 60).toFixed(1)
    );

    const todayPlan = await DailyPlan.findOne({
      userId,
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    });

    let tasksCompleted = 0;
    let tasksTotal = 0;

    if (todayPlan) {
      tasksTotal = todayPlan.tasks.length;

      tasksCompleted =
        todayPlan.tasks.filter(
          (task) => task.status === "completed"
        ).length;
    }

    res.status(200).json({
      success: true,
      data: {
        userName: user.name,
        studyStreak: user.currentStreak || 0,
        hoursToday,
        tasksCompleted,
        tasksTotal,
        weeklyScore: user.consistencyScore || 0,

        weeklyHours: [
          { day: "Mon", hours: 2 },
          { day: "Tue", hours: 4 },
          { day: "Wed", hours: 3 },
          { day: "Thu", hours: 6 },
          { day: "Fri", hours: 5 },
          { day: "Sat", hours: 8 },
          { day: "Sun", hours: 4 }
        ],

        upcomingExams: [
          {
            subject: "Operating Systems",
            daysRemaining: 3
          },
          {
            subject: "DBMS",
            daysRemaining: 7
          },
          {
            subject: "Computer Networks",
            daysRemaining: 12
          }
        ]
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
