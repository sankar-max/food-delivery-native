import { Client } from "react-native-appwrite"
import { appwriteConfig } from "./config"

export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform)
