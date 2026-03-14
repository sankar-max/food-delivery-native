import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { signInSchemaType } from "../schemas/auth.schema"
import { signIn } from "../service/auth.service"
import { USER_QUERY_KEY } from "./useUser"

export function useLogin() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: signInSchemaType) => signIn(data),
    onSuccess: async () => {
      // Invalidate the user query to immediately trigger a refetch of the profile
      await queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY })
    },
  })

  return { login: mutateAsync, loading: isPending }
}
