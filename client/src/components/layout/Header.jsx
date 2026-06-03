import React, { useMemo, useRef, useState } from "react";
import { Menu, Bell, X, CheckCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import useNotificationStore from "@/store/notificationStore";
import useAuthStore from "@/store/authStore";
import { generateInitials } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/formatters";
import useClickOutside from "@/hooks/useClickOutside";

const titles = {
  "/dashboard": "Dashboard",
  "/planner": "Daily Planner",
  "/subjects": "Subjects",
  "/analytics": "Analytics",
  "/resources": "Resources",
  "/pyq-analyzer": "PYQ Analyzer",
  "/ai-assistant": "AI Assistant",
  "/future-self": "Future Self",
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { notifications, unreadCount, fetchNotifications, markAsRead, markAllRead } = useNotificationStore();
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  useClickOutside(panelRef, () => setOpen(false));

  const title = useMemo(() => {
    const path = Object.keys(titles).find((route) => location.pathname.startsWith(route));
    return titles[path] || "AcademicAI";
  }, [location.pathname]);

  const name = user?.fullName || user?.name || "Student";
  const initials = generateInitials(name);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-[color:var(--border)] bg-navy px-4 md:px-6">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-xl p-2 text-white transition-colors hover:bg-white/5 md:hidden"
            onClick={() => navigate("/dashboard")}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-white md:text-xl">{title}</h1>
          </div>
        </div>

        <div className="relative flex items-center gap-3" ref={panelRef}>
          <button
            type="button"
            onClick={async () => {
              setOpen((v) => !v);
              if (!open) {
                await fetchNotifications();
              }
            }}
            className="relative rounded-full p-2 text-white transition-colors hover:bg-white/5"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 ? (
              <span className="absolute -right-1 -top-1 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold text-navy">
                {unreadCount}
              </span>
            ) : null}
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-navy">
            {initials}
          </div>

          {open ? (
            <div className="absolute right-0 top-14 w-[340px] max-w-[calc(100vw-1rem)] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-surface shadow-glow-lg">
              <div className="flex items-center justify-between border-b border-[color:var(--border)] px-4 py-3">
                <p className="font-semibold text-white">Notifications</p>
                <div className="flex items-center gap-2">
                  <button
                    className="rounded-lg px-3 py-1 text-xs font-medium text-primary hover:bg-primary/10"
                    onClick={markAllRead}
                  >
                    <CheckCheck className="mr-1 inline h-3.5 w-3.5" />
                    Mark all read
                  </button>
                  <button
                    className="rounded-lg p-2 text-muted hover:bg-white/5 hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-sm text-muted">No notifications yet.</div>
                ) : (
                  notifications.map((notification) => {
                    const isRead = notification.read || notification.isRead;
                    return (
                      <button
                        key={notification._id || notification.id}
                        onClick={async () => {
                          await markAsRead(notification._id || notification.id);
                          setOpen(false);
                        }}
                        className="flex w-full gap-3 border-b border-[color:var(--border)] px-4 py-3 text-left transition-colors hover:bg-white/5"
                      >
                        <span className={cn("mt-2 h-2.5 w-2.5 rounded-full", isRead ? "bg-muted" : "bg-primary")} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-white">{notification.title || "Update"}</p>
                          <p className="line-clamp-2 text-sm text-muted">{notification.message || notification.body || ""}</p>
                          <p className="mt-1 text-xs text-muted">{formatRelativeTime(notification.createdAt || notification.timestamp || Date.now())}</p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
