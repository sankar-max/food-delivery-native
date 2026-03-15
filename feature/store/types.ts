import { User } from "../auth/types/user.types"

export type AuthStore = {
  user: User | null
  isLoading: boolean

  setUser: (user: User | null) => void
  fetchUser: () => Promise<void>
  logout: () => void
}
