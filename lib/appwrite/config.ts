import { env } from "@/lib/env";

export const appwriteConfig = {
	endpoint: env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
	projectId: env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
	platform: "com.sankar.fooddelivery",

	databaseId: "69b1c0750023dad30c37",
	bucketId: "69b5b081003949718a9e",
	userTable: "user",
	categoriesTable: "categories",
	menuTable: "menu",
	customizationTable: "customization",
	menuCustomizationTable: "menu_customization",
} as const;
