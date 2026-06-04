import React from "react";
import Badge from "@/components/ui/Badge";

const exams = [
  {
    subject: "Operating Systems",
    days: 3,
  },
  {
    subject: "DBMS",
    days: 7,
  },
  {
    subject: "Computer Networks",
    days: 12,
  },
];

export default function UpcomingExams() {
  return (
    <div className="space-y-3">
      {exams.map((exam) => (
        <div
          key={exam.subject}
          className="flex items-center justify-between rounded-2xl bg-white/5 p-4"
        >
          <div>
            <p className="font-medium text-white">{exam.subject}</p>
            <p className="text-sm text-muted">
              {exam.days} days remaining
            </p>
          </div>

          <Badge
            variant={
              exam.days <= 3
                ? "danger"
                : exam.days <= 7
                ? "warning"
                : "success"
            }
          >
            {exam.days}d
          </Badge>
        </div>
      ))}
    </div>
  );
}
