import { images } from "@/constants"
import CartItem from "@/feature/cart/CartItem"
import CartHeader from "@/feature/cart/header"
import PaymentInfo from "@/feature/cart/PaymentInfo"
import { useCartStore } from "@/feature/cart/store"
import { useRouter } from "expo-router"
import React from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Cart = () => {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const getTotalPrice = useCartStore((state) => state.getTotalPrice)
  const getTotalItems = useCartStore((state) => state.getTotalItems)
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()
  const fees = {
    discount: 0.5,
    deliveryFee: 0.0,
  }
  const total = (totalPrice + fees.deliveryFee - fees.discount).toFixed(2)
  return (
    <SafeAreaView className="bg-white-100 flex-1">
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-32 px-5 pt-5"
        ListHeaderComponent={<CartHeader title="Cart" />}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center pt-20 px-10">
            <View className="relative mb-12 items-center justify-center">
              <View
                className="bg-primary/5 rounded-full absolute"
                style={{ width: 260, height: 260 }}
              />
              <Image
                source={images.emptyState}
                style={{ width: 220, height: 220 }}
                resizeMode="contain"
              />
              <View className="absolute bottom-0 right-4 bg-white p-4 rounded-3xl shadow-premium">
                <Image
                  source={images.bag}
                  style={{ width: 28, height: 28 }}
                  tintColor="#FE8C00"
                />
              </View>
            </View>

            <Text className="h1-bold text-center mb-3">Your bag is empty</Text>
            <Text className="paragraph-medium text-center mb-10 leading-6 px-4">
              Looks like you haven&apos;t made your choice yet. Explore our menu
              and find something delicious!
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)")}
              activeOpacity={0.8}
              className="bg-primary px-10 py-5 rounded-[24px] shadow-lg shadow-primary/30"
            >
              <Text className="body-bold text-white">Start Ordering</Text>
            </TouchableOpacity>
          </View>
        }
        ListFooterComponent={
          totalItems > 0 ? (
            <View className="gap-5">
              <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                <Text className="h3-bold text-dark-100 mb-5">Payment</Text>
                <PaymentInfo
                  label={`Total items (${totalItems})`}
                  value={`$${totalPrice.toFixed()}`}
                />
                <PaymentInfo
                  label={`Delivery fee`}
                  value={`$${fees.deliveryFee.toFixed(2)}`}
                />
                <PaymentInfo
                  label={`Discount`}
                  value={`$${fees.discount.toFixed(2)}`}
                />
                <PaymentInfo
                  label={`Total items (${totalItems})`}
                  value={`$${total}`}
                />
                <View className="border-t border-gray-200 my-2" />
                <PaymentInfo
                  label={`Total items (${totalItems})`}
                  value={`$${total}`}
                  labelStyle="base-bold !text-dark-100"
                  valueStyle="base-bold !text-dark-100 text-right"
                />
              </View>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  )
}

export default Cart
