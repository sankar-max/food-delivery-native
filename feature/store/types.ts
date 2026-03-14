import { User } from "../auth/types/user.types"

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

type AuthActions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  setUser: (user: User) => void

  fetchUser: () => Promise<void>
}

export type AuthStore = AuthState & AuthActions
