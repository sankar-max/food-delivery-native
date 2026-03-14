import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { signUpSchemaType } from "../schemas/auth.schema"
import { createUser } from "../service/user.service"
import { USER_QUERY_KEY } from "./useUser"

export function useSignup() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: signUpSchemaType) => createUser(data),
    onSuccess: async () => {
      // After creating user (and auto-signing in), invalidate the active user cache
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY })
    },
  })

  return { signup: mutateAsync, loading: isPending }
}
