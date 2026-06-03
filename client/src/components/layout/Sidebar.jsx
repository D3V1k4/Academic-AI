import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  BarChart3,
  PlayCircle,
  FileText,
  Bot,
  Sparkles,
  LogOut,
  GraduationCap,
} from "lucide-react";

import useAuthStore from "@/store/authStore";
import { generateInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/planner", label: "Daily Planner", icon: CalendarDays },
  { to: "/subjects", label: "Subjects", icon: BookOpen },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/resources", label: "Resources", icon: PlayCircle },
  { to: "/pyq-analyzer", label: "PYQ Analyzer", icon: FileText },
  { to: "/ai-assistant", label: "AI Assistant", icon: Bot },
  { to: "/future-self", label: "Future Self", icon: Sparkles },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const name = user?.fullName || user?.name || "Student";
  const branch = user?.branch || "Engineering";
  const semester = user?.semester || user?.currentSemester || 1;

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[240px] flex-col border-r border-[color:var(--border)] bg-surface md:flex">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-navy shadow-glow">
          <GraduationCap className="h-6 w-6" />
        </div>
        <div>
          <div className="font-display text-xl font-bold text-white">AcademicAI</div>
          <div className="text-sm text-muted">Study Smarter</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "nav-link",
                isActive ? "nav-link-active" : ""
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn("h-5 w-5", isActive ? "text-navy" : "text-white")} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[color:var(--border)] p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-navy/40 p-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-navy">
            {generateInitials(name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-white">{name}</p>
            <p className="truncate text-sm text-muted">{branch} • Sem {semester}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-coral/30 bg-coral/10 px-4 py-2 text-sm font-medium text-coral transition-all duration-200 hover:bg-coral/20"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
