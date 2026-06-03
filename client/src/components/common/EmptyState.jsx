import React from "react";
import { AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function EmptyState({
  title = "Nothing here yet",
  description = "There is no data to show right now.",
  actionLabel,
  onAction,
  icon: Icon = AlertCircle,
}) {
  return (
    <div className="card-dark flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Icon className="h-8 w-8" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="max-w-md text-sm text-muted">{description}</p>
      </div>
      {actionLabel ? (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
