import { signInSchemaType, signUpSchemaType } from "@/feature/authSchema"
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  TablesDB,
} from "react-native-appwrite"

export const appWriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  platform: "com.sankar.fooddelivery",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: "69b1c0750023dad30c37",
  userTable: "user",
}

export const client = new Client()

client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform)

export const account = new Account(client)
export const tables = new TablesDB(client)
export const database = new Databases(client)
export const avatar = new Avatars(client)

export const createUser = async ({
  name,
  email,
  password,
}: signUpSchemaType) => {
  try {
    const newUser = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    })

    if (!newUser) throw new Error("User creation failed")

    await signIn({ email, password })
    const avatarUrl = avatar.getInitials({ name }).toString()
    return await tables.createRow({
      databaseId: appWriteConfig.databaseId,
      tableId: appWriteConfig.userTable,
      rowId: ID.unique(),
      data: {
        username: name,
        email,
        $id: newUser.$id,
        avatar_url: avatarUrl,
      },
    })
  } catch (error: any) {
    console.error("Error creating user:", error)
    throw new Error(error.message || "Failed to create user")
  }
}

export const signIn = async ({ email, password }: signInSchemaType) => {
  try {
    const session = await account.createEmailPasswordSession({
      email,
      password,
    })
    return session
  } catch (error: any) {
    console.error("Error signing in:", error)
    throw new Error(error.message || "Failed to sign in")
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get()
    if (!currentAccount) throw new Error("No active account")

    const userDocs = await tables.listRows({
      databaseId: appWriteConfig.databaseId,
      tableId: appWriteConfig.userTable,
      queries: [Query.equal("userId", currentAccount.$id)],
    })

    if (userDocs.total === 0) return null

    return userDocs.rows[0]
  } catch (error) {
    console.error("Error fetching current user:", error)
    return null
  }
}

export const signOut = async () => {
  try {
    return await account.deleteSession({ sessionId: "current" })
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}
