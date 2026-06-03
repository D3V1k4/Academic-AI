import React from "react";
import { useParams, Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function SubjectDetailPage() {
  const { id } = useParams();

  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/subjects" className="text-sm text-primary hover:text-amber">← Back to subjects</Link>
          <h2 className="section-heading mt-2">Subject Detail</h2>
          <p className="mt-2 text-muted">Subject ID: {id}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card variant="dark" padding="lg" className="lg:col-span-3">
          <h3 className="text-xl font-semibold text-white">All Topics</h3>
          <div className="mt-4 space-y-3">
            {["Introduction", "Core Concepts", "Exam Practice"].map((topic) => (
              <div key={topic} className="rounded-2xl bg-white/5 p-4 text-white">{topic}</div>
            ))}
          </div>
        </Card>
        <Card variant="dark" padding="lg" className="lg:col-span-2">
          <h3 className="text-xl font-semibold text-white">Course Outcomes</h3>
          <div className="mt-4 space-y-3">
            {["CO1", "CO2", "CO3"].map((co) => (
              <div key={co} className="rounded-2xl bg-white/5 p-4 text-white">{co}</div>
            ))}
          </div>
          <div className="mt-5">
            <Button>Get Videos</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
