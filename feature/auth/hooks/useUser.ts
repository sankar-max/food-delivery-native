import { useQuery } from "@tanstack/react-query"
import { getCurrentUser } from "../service/user.service"
import { useAuthStore } from "../../store/auth.store"

export const USER_QUERY_KEY = ["user"]

export function useUser() {
  const { setUser, setIsAuthenticated } = useAuthStore()

  return useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      try {
        const user = await getCurrentUser()
        if (user) {
          setUser(user) 
          setIsAuthenticated(true)
          return user
        }
        setIsAuthenticated(false)
        return null
      } catch {
        setIsAuthenticated(false)
        return null
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 1, 
  })
}
