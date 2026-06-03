import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function SubjectsPage() {
  const subjects = [
    { name: "Operating Systems", progress: 72 },
    { name: "DBMS", progress: 64 },
    { name: "Computer Networks", progress: 48 },
    { name: "DSA", progress: 85 },
  ];

  return (
    <div className="page-container space-y-6">
      <div>
        <h2 className="section-heading">Current Semester Subjects</h2>
        <p className="mt-2 text-muted">Track coverage and move through your syllabus.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => (
          <Card key={subject.name} variant="dark" padding="md" className="border-t-4 border-primary">
            <p className="text-lg font-semibold text-white">{subject.name}</p>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${subject.progress}%` }} />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-muted">{subject.progress}% covered</span>
              <Badge variant="info">Sem 5</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
