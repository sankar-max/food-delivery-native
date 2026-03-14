import { Models } from "react-native-appwrite"

export type User = Models.Row & {
  userId: string
  username: string
  email: string
  avatar_url: string
}
