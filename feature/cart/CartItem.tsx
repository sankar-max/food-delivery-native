import { images } from "@/constants"
import { useCartStore } from "@/feature/cart/store"
import { CartItemType } from "@/feature/cart/types"
import { Image } from "expo-image"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"

const CartItem = ({ item }: { item: CartItemType }) => {
  const { id, name, price, image_url, quantity, customizations } = item
  const { increaseQty, decreaseQty, removeItem } = useCartStore()

  const totalPrice =
    (price +
      (customizations?.reduce((acc, curr) => acc + curr.price, 0) ?? 0)) *
    quantity

  return (
    <View className="flex-row items-center bg-white rounded-3xl p-4 mb-4 shadow-soft">
      <View style={{ width: 80, height: 80 }}>
        <Image
          source={{ uri: image_url }}
          contentFit="cover"
          transition={200}
          style={{ width: "100%", height: "100%" }}
          className="rounded-2xl"
        />
      </View>

      <View className="flex-1 ml-4 justify-between" style={{ height: 80 }}>
        <View>
          <View className="flex-row justify-between items-start">
            <Text
              className="base-bold text-dark-100 flex-1 mr-2"
              numberOfLines={1}
            >
              {name}
            </Text>
            <TouchableOpacity
              onPress={() => removeItem(id, customizations ?? [])}
              style={{ padding: 4 }}
            >
              <Image
                source={images.trash}
                style={{ width: 16, height: 16 }}
                className="opacity-40"
              />
            </TouchableOpacity>
          </View>

          {customizations && customizations.length > 0 && (
            <Text className="body-medium text-gray-100" numberOfLines={1}>
              {customizations.map((c) => c.name).join(", ")}
            </Text>
          )}
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="base-bold text-primary">
            ${totalPrice.toFixed(2)}
          </Text>

          <View className="flex-row items-center bg-gray-100/10 rounded-xl px-2 py-1">
            <TouchableOpacity
              onPress={() => decreaseQty(id, customizations ?? [])}
              activeOpacity={0.7}
            >
              <View
                className="bg-white rounded-lg items-center justify-center shadow-soft"
                style={{ width: 28, height: 28 }}
              >
                <Image
                  source={images.minus}
                  style={{ width: 12, height: 12 }}
                  tintColor="#FE8C00"
                />
              </View>
            </TouchableOpacity>

            <Text className="mx-3 body-bold text-dark-100">{quantity}</Text>

            <TouchableOpacity
              onPress={() => increaseQty(id, customizations ?? [])}
              activeOpacity={0.7}
            >
              <View
                className="bg-primary rounded-lg items-center justify-center shadow-soft"
                style={{ width: 28, height: 28 }}
              >
                <Image
                  source={images.plus}
                  style={{ width: 12, height: 12 }}
                  tintColor="white"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CartItem
