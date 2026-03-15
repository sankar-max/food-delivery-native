import React from "react"
import { View } from "react-native"
import Skeleton from "./Skeleton"

const MenuCardSkeleton = () => {
  return (
    <View className="menu-card bg-gray-100/10 overflow-hidden">
      <Skeleton width="100%" height={160} borderRadius={0} />
      <View className="p-3 items-center gap-y-2">
        <Skeleton width="80%" height={20} />
        <Skeleton width="40%" height={16} />
        <Skeleton width="60%" height={24} borderRadius={12} style={{ marginTop: 8 }} />
      </View>
    </View>
  )
}

export default MenuCardSkeleton
