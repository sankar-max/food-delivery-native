import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { getCurrentUser } from "../auth/service/user.service"
import type { AuthStore } from "./types"

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      setUser: (user) => set({ user }),

      fetchUser: async () => {
        set({ isLoading: true })

        try {
          const user = await getCurrentUser()

          set({
            user: user ?? null,
            isLoading: false,
          })
        } catch (error) {
          console.error("Failed to fetch user:", error)

          set({
            user: null,
            isLoading: false,
          })
        }
      },

      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
)
