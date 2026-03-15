import CartBtn from "@/components/CartBtn"
import { images } from "@/constants"
import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

interface HomeHeaderProps {
  username?: string
}

const HomeHeader = ({ username }: HomeHeaderProps) => {
  return (
    <View className="items-center justify-between flex-row w-full my-6">
      <View className="flex-1">
        <View className="flex-row items-center gap-x-2 mb-0.5">
          <Text className="small-bold text-gray-100">DELIVER TO</Text>
          <View className="bg-primary/10 px-2 py-0.5 rounded-md">
            <Text className="text-[10px] font-quicksand-bold text-primary">
              {username?.toUpperCase() || "GUEST"}
            </Text>
          </View>
        </View>
        <TouchableOpacity className="flex-row items-center gap-x-1.5 pt-0.5">
          <Text className="base-bold">Connaught Place, India</Text>
          <Image
            source={images.arrowDown}
            resizeMode="contain"
            className="size-3.5"
            tintColor="#FE8C00"
          />
        </TouchableOpacity>
      </View>
      <View className="ml-4">
        <CartBtn />
      </View>
    </View>
  )
}

export default HomeHeader
