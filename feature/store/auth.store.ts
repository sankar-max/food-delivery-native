import { create } from "zustand"
import { getCurrentUser } from "../auth/service/user.service"
import { User } from "../auth/types/user.types"
import { AuthStore } from "./types"

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setUser: (user: User) => set({ user }),
  fetchUser: async () => {
    try {
      set({ isLoading: true })
      const user = await getCurrentUser()
      set({ user: user, isAuthenticated: true })
    } catch (error) {
      console.log(error)
      set({ isLoading: false, isAuthenticated: false })
    } finally {
      set({ isLoading: false })
    }
  },
}))
