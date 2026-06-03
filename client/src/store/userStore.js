import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import api from "@/api/axios.config";
import ENDPOINTS from "@/api/endpoints";

const useUserStore = create(
  devtools(
    persist(
      (set, get) => ({
        profile: null,
        semester: 1,
        subjects: [],
        studyStreak: 0,
        isLoading: false,

        fetchProfile: async () => {
          set({ isLoading: true });
          try {
            const { data } = await api.get(ENDPOINTS.USER.PROFILE);
            const profile = data?.data || data?.user || data || null;

            set({
              profile,
              semester: profile?.semester || get().semester || 1,
              studyStreak: profile?.studyStreak ?? get().studyStreak ?? 0,
              isLoading: false,
            });

            return profile;
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },

        updateProfile: async (payload) => {
          set({ isLoading: true });
          try {
            const { data } = await api.put(ENDPOINTS.USER.PROFILE, payload);
            const profile = data?.data || data?.user || data || null;

            set({
              profile,
              semester: profile?.semester || get().semester || 1,
              studyStreak: profile?.studyStreak ?? get().studyStreak ?? 0,
              isLoading: false,
            });

            return profile;
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },

        fetchSubjects: async () => {
          set({ isLoading: true });
          try {
            const { data } = await api.get(ENDPOINTS.SUBJECTS.LIST);
            const subjects = data?.data || data || [];

            set({
              subjects,
              isLoading: false,
            });

            return subjects;
          } catch (error) {
            set({ isLoading: false });
            throw error;
          }
        },

        setSemester: (semester) => set({ semester }),

        setSubjects: (subjects) => set({ subjects }),

        clearUserData: () =>
          set({
            profile: null,
            semester: 1,
            subjects: [],
            studyStreak: 0,
          }),
      }),
      {
        name: "user-storage",
        partialize: (state) => ({
          profile: state.profile,
          semester: state.semester,
          subjects: state.subjects,
          studyStreak: state.studyStreak,
        }),
      }
    )
  )
);

export default useUserStore;
