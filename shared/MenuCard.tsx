import { MenuItem } from "@/feature/menu/types"
import { appwriteConfig } from "@/lib/appwrite/config"
import { Image } from "expo-image"
import React from "react"
import { Platform, Text, TouchableOpacity, View } from "react-native"

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { name, price, image_url, type } = item

  // Only append project ID if it's an Appwrite URL and missing the project parameter
  const isAppwriteUrl =
    image_url.includes("appwrite") ||
    image_url.includes(appwriteConfig.endpoint)
  const imageUri =
    isAppwriteUrl && !image_url.includes("project=")
      ? `${image_url}${image_url.includes("?") ? "&" : "?"}project=${appwriteConfig.projectId}`
      : image_url
  const isIOS = Platform.OS === "ios"

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="menu-card !pb-4 !pt-0 overflow-hidden"
      style={isIOS ? {} : { elevation: 10, shadowColor: "#878787" }}
    >
      <View className="w-full relative">
        <Image
          source={{ uri: imageUri }}
          contentFit="cover"
          transition={300}
          style={{ width: "100%", height: 160 }}
          className="rounded-t-3xl"
        />
        {type && (
          <View className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg">
            <Text className="text-[10px] font-quicksand-bold text-primary uppercase">
              {type}
            </Text>
          </View>
        )}
      </View>

      <View className="w-full px-1 pt-3">
        <Text className="base-bold text-dark-100" numberOfLines={1}>
          {name}
        </Text>
        <View className="flex-row items-center justify-between mt-1">
          <Text className="body-medium text-gray-200">
            Starting at ${price}
          </Text>
        </View>

        <TouchableOpacity className="mt-4 bg-primary/10 py-2 rounded-xl flex-row items-center justify-center">
          <Text className="text-xs font-quicksand-bold text-primary">
            Add to Bag +
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default MenuCard

export { Category, MenuItem } from "@/feature/menu/types"

export interface CartCustomization {
  id: string
}
