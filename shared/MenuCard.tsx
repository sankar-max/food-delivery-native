import { appwriteConfig } from "@/lib/appwrite/config"
import { Image } from "expo-image"
import React from "react"
import { Platform, Text, TouchableOpacity } from "react-native"
import { Models } from "react-native-appwrite"

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { name, price, image_url } = item

  const imageUri = image_url.includes("project=")
    ? image_url
    : `${image_url}${image_url.includes("?") ? "&" : "?"}project=${appwriteConfig.projectId}`
  const isIOS = Platform.OS === "ios"
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="menu-card"
      style={isIOS ? {} : { elevation: 10, shadowColor: "#878787" }}
    >
      <Image
        source={{ uri: imageUri }}
        contentFit="cover"
        transition={200}
        style={{ width: "100%", height: 160 }}
      />
      <Text className={"text-center base-bold text-dark-100"} numberOfLines={1}>
        {name}
      </Text>
      <Text className="body-regular mb-4 text-gray-200">From ${price}</Text>
      <TouchableOpacity className="flex-center">
        <Text className="paragraph-bold text-primary">Add to Cart +</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MenuCard

export interface MenuItem extends Models.DefaultRow {
  name: string
  price: number
  image_url: string
  description: string
  calories: number
  protein: number
  rating: number
  type: string
}

export interface Category extends Models.DefaultRow {
  name: string
  description: string
}

export interface CartCustomization {
  id: string
}
