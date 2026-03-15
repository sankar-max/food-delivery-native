import { appwriteConfig } from "@/lib/appwrite/config"
import { tables } from "@/lib/appwrite/database"
import { Query } from "react-native-appwrite"
import { Category, MenuItem } from "../types"

export const MenuService = {
  async getMenus({
    category,
    query,
  }: {
    category?: string
    query?: string
  } = {}): Promise<MenuItem[]> {
    const queries = []
    try {
      if (category) {
        queries.push(Query.equal("categories", category))
      }
      if (query) {
        queries.push(Query.search("name", query))
      }
      const menus = await tables.listRows({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.menuTable,
        queries,
      })
      return menus.rows as MenuItem[]
    } catch (error) {
      console.error("Error fetching menus:", error)
      throw new Error("Failed to fetch menus")
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const categories = await tables.listRows({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.categoriesTable,
      })
      return categories.rows as Category[]
    } catch (error) {
      console.error("Error fetching categories:", error)
      throw new Error("Failed to fetch categories")
    }
  },
}
