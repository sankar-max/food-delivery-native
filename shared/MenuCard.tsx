import { useCartStore } from "@/feature/cart/store"
import type { MenuItem } from "@/feature/menu/types"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { name, price, image_url, type, $id } = item
  const { addItem } = useCartStore()
  const isInCart = useCartStore((state) =>
    state.items.some((i) => i.id === $id),
  )
  const router = useRouter()

  const handleAddToCart = () => {
    if (isInCart) {
      router.push("/(tabs)/cart")
    } else {
      addItem({ id: $id, name, price, image_url })
    }
  }
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
          contentFit="contain"
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

        <TouchableOpacity
          onPress={handleAddToCart}
          className="mt-4 bg-primary/10 py-2 rounded-xl flex-row items-center justify-center"
        >
          {isInCart ? (
            <Text className="text-xs font-quicksand-bold text-primary">
              View in Bag
            </Text>
          ) : (
            <Text className="text-xs font-quicksand-bold text-primary">
              Add to Bag +
            </Text>
          )}
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
