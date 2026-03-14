import { useState } from "react"
import type { signUpSchemaType } from "../schemas/auth.schema"
import { createUser } from "../service/user.service"

export function useSignup() {
  const [loading, setLoading] = useState(false)

  async function signup(data: signUpSchemaType) {
    setLoading(true)
    try {
      await createUser(data)
    } finally {
      setLoading(false)
    }
  }

  return { signup, loading }
}
