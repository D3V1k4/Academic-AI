import { format, formatDistanceToNow, parseISO } from "date-fns";

export function formatDate(date) {
  if (!date) return "-";
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "dd MMM yyyy");
}

export function formatRelativeTime(date) {
  if (!date) return "-";
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

export function formatHours(decimal = 0) {
  const totalMinutes = Math.round(Number(decimal || 0) * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export function formatGPA(number = 0) {
  return Number(number || 0).toFixed(2);
}
