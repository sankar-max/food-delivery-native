import { env } from "@/lib/env"

export const appwriteConfig = {
  endpoint: env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: "com.sankar.fooddelivery",

  databaseId: "69b1c0750023dad30c37",
  userTable: "user",
} as const
