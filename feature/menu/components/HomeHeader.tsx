import CartBtn from "@/components/CartBtn"
import { images } from "@/constants"
import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

interface HomeHeaderProps {
  username?: string
}

const HomeHeader = ({ username }: HomeHeaderProps) => {
  return (
    <View className="items-center justify-between flex-row w-full my-5">
      <View className="items-ce justify-center">
        <View className="flex-row items-center gap-x-1">
          <Text>DELIVER TO</Text>
          <View className="bg-primary p-1 px-2 rounded-full block text-center">
            <Text className="text-white-100 text-xs">
              {username || "Guest"}
            </Text>
          </View>
        </View>
        <TouchableOpacity className="flex-row items-center gap-x-1">
          <Text>India</Text>
          <Image
            source={images.arrowDown}
            resizeMode="contain"
            className="size-3"
          />
        </TouchableOpacity>
      </View>
      <CartBtn />
    </View>
  )
}

export default HomeHeader
