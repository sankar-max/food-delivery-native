import { useState } from "react"
import type { signInSchemaType } from "../schemas/auth.schema"
import { signIn } from "../service/auth.service"

export function useLogin() {
  const [loading, setLoading] = useState(false)

  async function login(data: signInSchemaType) {
    setLoading(true)
    try {
      await signIn(data)
    } finally {
      setLoading(false)
    }
  }

  return { login, loading }
}
