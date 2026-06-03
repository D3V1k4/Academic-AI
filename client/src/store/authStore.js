import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import api from "@/api/axios.config";
import ENDPOINTS from "@/api/endpoints";

const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: localStorage.getItem("token") || null,
        isAuthenticated: !!localStorage.getItem("token"),
        isLoading: false,

        login: async (credentials) => {
          set({ isLoading: true });
          try {
            const { data } = await api.post(ENDPOINTS.AUTH.LOGIN, credentials);
            const token = data?.token || data?.data?.token || data?.data?.data?.token;
            const user = data?.user || data?.data?.user || data?.data?.data?.user || null;

            if (token) {
              localStorage.setItem("token", token);
            }

            set({
              user,
              token: token || null,
              isAuthenticated: true,
              isLoading: false,
            });

            return data;
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },

        signup: async (payload) => {
          set({ isLoading: true });
          try {
            const normalizedPayload = {
              name: payload?.fullName || payload?.name || "",
              email: payload?.email,
              password: payload?.password,
            };

            const { data } = await api.post(ENDPOINTS.AUTH.REGISTER, normalizedPayload);
            const token = data?.token || data?.data?.token || data?.data?.data?.token;
            const user = data?.user || data?.data?.user || data?.data?.data?.user || null;

            if (token) {
              localStorage.setItem("token", token);
            }

            set({
              user,
              token: token || null,
              isAuthenticated: true,
              isLoading: false,
            });

            return data;
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },

        logout: async () => {
          try {
            await api.post(ENDPOINTS.AUTH.LOGOUT);
          } catch {
            // ignore logout API errors
          } finally {
            localStorage.removeItem("token");
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        },

        checkAuth: async () => {
          const token = localStorage.getItem("token");
          if (!token) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
            return;
          }

          set({ isLoading: true });
          try {
            const { data } = await api.get(ENDPOINTS.USER.PROFILE);
            const user = data?.user || data?.data || null;

            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
          } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("auth-storage");
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
            throw error;
          }
        },

        setUser: (user) => set({ user }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          token: state.token,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);

export default useAuthStore;
