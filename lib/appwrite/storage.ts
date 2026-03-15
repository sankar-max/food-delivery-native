import { Storage } from "react-native-appwrite"
import { client } from "./client"

export const storage = new Storage(client)
