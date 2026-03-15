import { appwriteConfig } from "@/lib/appwrite/config"
import { Query } from "react-native-appwrite"
import { tables } from "../database"
export const getMenuQuery = async ({
  category,
  query,
}: {
  category: string
  query: string
}) => {
  const queries = []
  try {
    if (category) {
      queries.push(Query.equal("category", category))
    }
    if (query) {
      queries.push(Query.search("name", query))
    }
    const menus = await tables.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.menuTable,
      queries,
    })
    return menus.rows
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch menus", { cause: error })
  }
}

export const getCategoryQuery = async () => {
  try {
    const categories = await tables.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.categoriesTable,
    })
    return categories.rows
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch categories", { cause: error })
  }
}
