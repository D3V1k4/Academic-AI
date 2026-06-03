import { create } from "zustand";
import { devtools } from "zustand/middleware";
import api from "@/api/axios.config";
import ENDPOINTS from "@/api/endpoints";

let pollTimeout = null;

const useNotificationStore = create(
  devtools((set, get) => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,

    fetchNotifications: async () => {
      set({ isLoading: true });
      try {
        const { data } = await api.get(ENDPOINTS.NOTIFICATIONS.LIST);
        const notifications = data?.data || data || [];
        const unreadCount = notifications.filter((n) => !n.read).length;

        set({
          notifications,
          unreadCount,
          isLoading: false,
        });

        return notifications;
      } catch (error) {
        set({ isLoading: false });
        throw error;
      }
    },

    markAsRead: async (id) => {
      const previous = get().notifications;
      set({
        notifications: previous.map((n) =>
          n._id === id || n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(get().unreadCount - 1, 0),
      });

      try {
        await api.patch(ENDPOINTS.NOTIFICATIONS.READ(id));
      } catch (error) {
        set({ notifications: previous });
        throw error;
      }
    },

    markAllRead: async () => {
      const previous = get().notifications;
      set({
        notifications: previous.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      });

      try {
        await Promise.all(
          previous
            .filter((n) => !n.read)
            .map((n) => api.patch(ENDPOINTS.NOTIFICATIONS.READ(n._id || n.id)))
        );
      } catch (error) {
        set({ notifications: previous });
        throw error;
      }
    },

    startPolling: () => {
      if (pollTimeout) {
        clearTimeout(pollTimeout);
      }

      const poll = async () => {
        try {
          await get().fetchNotifications();
        } catch {
          // keep polling even if one request fails
        } finally {
          pollTimeout = setTimeout(poll, 60000);
        }
      };

      poll();
    },

    stopPolling: () => {
      if (pollTimeout) {
        clearTimeout(pollTimeout);
        pollTimeout = null;
      }
    },
  }))
);

export default useNotificationStore;
