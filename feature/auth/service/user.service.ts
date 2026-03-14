import { account } from "@/lib/appwrite/account"
import { avatars } from "@/lib/appwrite/avatars"
import { appwriteConfig } from "@/lib/appwrite/config"
import { tables } from "@/lib/appwrite/database"
import { ID, Query } from "react-native-appwrite"
import type { signUpSchemaType } from "../schemas/auth.schema"
import type { User } from "../types/user.types"
import { signIn } from "./auth.service"

export async function createUser(input: signUpSchemaType) {
  try {
    const { name, email, password } = input

    const user = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    })

    if (!user) throw new Error("User creation failed")

    const avatarUrl = avatars.getInitials({ name }).toString()

    await tables.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userTable,
      rowId: ID.unique(),
      data: {
        $id: user.$id,
        username: name,
        email,
        avatar_url: avatarUrl,
      },
    })

    await signIn({ email, password })

    return user
  } catch (error: any) {
    console.error("Error creating user:", error)
    throw new Error(error.message || "Failed to create user")
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const accountData = await account.get()

    if (!accountData) throw new Error("No active account")

    const result = await tables.listRows<User>({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.userTable,
      queries: [Query.equal("$id", accountData.$id)],
    })

    return result.rows[0] ?? null
  } catch (error) {
    console.error("Error fetching current user:", error)
    return null
  }
}
