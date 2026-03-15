import { ID } from "react-native-appwrite"
import { appwriteConfig } from "./appwrite/config"
import { database, tables } from "./appwrite/database"
import { storage } from "./appwrite/storage"
import * as FileSystem from "expo-file-system/legacy"
import dummyData from "./seed.data"

interface Category {
  name: string
  description: string
}

interface Customization {
  name: string
  price: number
  type: "topping" | "side" | "size" | "crust" | string // extend as needed
}

interface MenuItem {
  name: string
  description: string
  image_url: string
  price: number
  rating: number
  calories: number
  protein: number
  category_name: string
  customizations: string[] // list of customization names
}

interface DummyData {
  categories: Category[]
  customizations: Customization[]
  menu: MenuItem[]
}

// ensure dummyData has correct shape
const data = dummyData as DummyData

async function clearAll(collectionId: string): Promise<void> {
  const list = await database.listDocuments(
    appwriteConfig.databaseId,
    collectionId,
  )

  await Promise.all(
    list.documents.map((doc: any) =>
      database.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id),
    ),
  )
}

async function clearStorage(): Promise<void> {
  const list = await storage.listFiles({ bucketId: appwriteConfig.bucketId })

  await Promise.all(
    list.files.map((file) =>
      storage.deleteFile({
        bucketId: appwriteConfig.bucketId,
        fileId: file.$id,
      }),
    ),
  )
}

async function uploadImageToStorage(imageUrl: string) {
  try {
    console.log(`Attempting to download image: ${imageUrl}`)
    // Improve filename extraction: remove query parameters and special chars
    const baseName = imageUrl.split("/").pop()?.split("?")[0] || "image"
    const extension = baseName.includes(".") ? "" : ".jpg"
    const filename = `${baseName}${extension}`
    
    const fileUri = `${FileSystem.cacheDirectory}${Date.now()}-${filename}`

    const downloadResult = await FileSystem.downloadAsync(imageUrl, fileUri)
    
    if (downloadResult.status !== 200) {
      throw new Error(`Failed to download image (status ${downloadResult.status})`)
    }

    const fileInfo = await FileSystem.getInfoAsync(downloadResult.uri)
    if (!fileInfo.exists) {
      throw new Error(`File does not exist after download: ${downloadResult.uri}`)
    }

    console.log(`Downloaded to: ${downloadResult.uri}, size: ${fileInfo.size}`)

    const fileObj = {
      name: filename,
      type: downloadResult.headers["content-type"] || downloadResult.headers["Content-Type"] || "image/jpeg",
      size: fileInfo.size,
      uri: downloadResult.uri,
    }

    console.log("Uploading to Appwrite storage...", JSON.stringify({ name: fileObj.name, type: fileObj.type, size: fileObj.size }))
    const file = await storage.createFile({
      bucketId: appwriteConfig.bucketId,
      fileId: ID.unique(),
      file: fileObj,
    })
    console.log(`Upload successful: ${file.$id}`)

    return storage.getFileViewURL(appwriteConfig.bucketId, file.$id)
  } catch (error: any) {
    console.error(`Error in uploadImageToStorage for ${imageUrl}:`, error)
    throw error 
  }
}

async function seed(): Promise<void> {
  console.log("Starting seeding process...")
  // 1. Clear all
  try {
    console.log("Clearing existing data...")
    await clearAll(appwriteConfig.categoriesTable)
    await clearAll(appwriteConfig.customizationTable)
    await clearAll(appwriteConfig.menuTable)
    await clearAll(appwriteConfig.menuCustomizationTable)
    await clearStorage()
    console.log("Cleanup complete.")
  } catch (error) {
    console.error("Error during cleanup:", error)
    // Continue anyway or abort? Let's abort for now to see the error
    throw error
  }

  // 2. Create Categories
  const categoryMap: Record<string, string> = {}
  for (const cat of data.categories) {
    const doc = await tables.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.categoriesTable,
      data: cat,
      rowId: ID.unique(),
    })
    categoryMap[cat.name] = doc.$id
  }

  // 3. Create Customizations
  const customizationMap: Record<string, string> = {}
  for (const cus of data.customizations) {
    const doc = await tables.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.customizationTable,
      data: {
        name: cus.name,
        price: cus.price,
        type: cus.type,
      },
      rowId: ID.unique(),
    })
    customizationMap[cus.name] = doc.$id
  }

  // 4. Create Menu Items
  const menuMap: Record<string, string> = {}
  for (const item of data.menu) {
    const uploadedImage = await uploadImageToStorage(item.image_url)

    const doc = await tables.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.menuTable,
      data: {
        name: item.name,
        description: item.description,
        image_url: uploadedImage,
        price: item.price,
        rating: item.rating,
        calories: item.calories,
        protein: item.protein,
        categories: categoryMap[item.category_name],
      },
      rowId: ID.unique(),
    })

    menuMap[item.name] = doc.$id

    // 5. Create menu_customizations
    for (const cusName of item.customizations) {
      if (!customizationMap[cusName]) {
        console.warn(`⚠️ Customization not found: ${cusName}`)
        continue
      }
      
      try {
        await tables.createRow({
          databaseId: appwriteConfig.databaseId,
          tableId: appwriteConfig.menuCustomizationTable,
          data: {
            menu: doc.$id,
            customization: [customizationMap[cusName]],
          },
          rowId: ID.unique(),
        })
      } catch (error) {
        console.error(`❌ Failed to link customization ${cusName} to ${item.name}:`, error)
        // Continue with other customizations
      }
    }
  }

  console.log("✅ Seeding complete.")
}

export default seed
