import { z } from "zod"

export const env = z
  .object({
    EXPO_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
    EXPO_PUBLIC_APPWRITE_PROJECT_ID: z.string(),
  })
  .parse(process.env)
