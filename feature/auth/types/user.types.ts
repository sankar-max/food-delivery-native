import { Models } from "react-native-appwrite"

export type User = Models.Document & {
  userId: string
  username: string
  email: string
  avatar_url: string
  dateOfBirth?: string | null
}
