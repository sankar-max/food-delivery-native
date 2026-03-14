import { Databases, TablesDB } from "react-native-appwrite"
import { client } from "./client"

export const database = new Databases(client)
export const tables = new TablesDB(client)
