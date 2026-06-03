import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, CalendarDays, PlayCircle, Bot, Menu } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/planner", label: "Planner", icon: CalendarDays },
  { to: "/resources", label: "Resources", icon: PlayCircle },
  { to: "/ai-assistant", label: "AI", icon: Bot },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-primary bg-navy px-2 py-2 md:hidden">
      <div className="grid grid-cols-5 gap-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center rounded-xl py-2 text-xs transition-colors ${
                isActive ? "text-primary" : "text-muted"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted"}`} />
                <span className="mt-1">{label}</span>
                {isActive ? <span className="mt-1 h-1 w-1 rounded-full bg-primary" /> : <span className="mt-1 h-1 w-1 rounded-full opacity-0" />}
              </>
            )}
          </NavLink>
        ))}

        <button
          type="button"
          className="flex flex-col items-center justify-center rounded-xl py-2 text-xs text-muted transition-colors hover:text-white"
          onClick={() => document.getElementById("mobile-drawer-toggle")?.click?.()}
        >
          <Menu className="h-5 w-5" />
          <span className="mt-1">More</span>
        </button>
      </div>
    </nav>
  );
}
