import type { MenuItem } from "@/feature/menu/types"
import { Image } from "expo-image"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { name, price, image_url, type } = item

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="menu-card bg-white rounded-3xl !pb-4 !pt-0 "
      style={{
        shadowColor: "#878787",
        // Android shadow
        elevation: 10,
        // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
      }}
    >
      <View className="w-full relative">
        <Image
          source={{ uri: image_url }}
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
