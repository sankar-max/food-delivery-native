import { useRouter } from "expo-router"
import React from "react"
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import CartItem from "./CartItem"
import PaymentInfo from "./PaymentInfo"
import CartHeader from "./header"
import { useCartStore } from "./store"

const CartScreen = () => {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()

  const subtotal = getTotalPrice()
  const deliveryFee = items.length > 0 ? 5.0 : 0.0
  const total = subtotal + deliveryFee

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white-100">
        <CartHeader title="My Cart" />
        <View className="flex-1 items-center justify-center p-6">
          <Text className="base-bold text-dark-100 mb-2">
            Your cart is empty
          </Text>
          <Text className="paragraph-medium text-gray-200 text-center mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)")}
            className="bg-primary px-8 py-4 rounded-2xl"
          >
            <Text className="body-bold text-white">Browse Menu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white-100">
      <CartHeader title="My Cart" />

      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ padding: 20 }}
        ListFooterComponent={() => (
          <View className="mt-4 bg-white rounded-3xl p-6 shadow-sm">
            <Text className="base-bold text-dark-100 mb-4">Order Summary</Text>

            <PaymentInfo label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <PaymentInfo
              label="Delivery Fee"
              value={`$${deliveryFee.toFixed(2)}`}
            />

            <View className="h-[1px] bg-gray-100/10 my-4" />

            <PaymentInfo
              label="Total"
              value={`$${total.toFixed(2)}`}
              labelStyle="base-bold text-dark-100"
              valueStyle="base-bold text-primary"
            />

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-primary mt-8 py-4 rounded-2xl items-center justify-center shadow-md shadow-primary/20"
              onPress={() => {
                // Handle checkout
                console.log("Proceeding to checkout")
              }}
            >
              <Text className="body-bold text-white">Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default CartScreen
