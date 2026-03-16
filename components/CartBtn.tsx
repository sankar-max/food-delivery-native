import { useCartStore } from "@/feature/cart/store"
import { images } from "@/constants"
import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

const CartBtn = () => {
  const totalItems = useCartStore((state) => state.getTotalItems())
  return (
    <TouchableOpacity className="cart-btn">
      <Image source={images.bag} resizeMode="contain" className="size-5" />
      {totalItems > 0 && (
        <View className={"cart-badge"}>
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default CartBtn
