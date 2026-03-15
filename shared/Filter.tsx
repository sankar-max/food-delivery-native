import { cn } from "@/lib/cn"
import { router, useLocalSearchParams } from "expo-router"
import React, { useState } from "react"
import { FlatList, Platform, Text, TouchableOpacity } from "react-native"
import { Category } from "./MenuCard"

type Props = {
  categories: Category[]
}
const Filter = ({ categories }: Props) => {
  const searchParams = useLocalSearchParams()
  const [activeCat, setActiveCat] = useState(searchParams.category || "")
  const isIOS = Platform.OS === "ios"

  const handleChangeCategory = (category: string) => {
    setActiveCat(category)
    router.setParams({ category })
  }
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={categories}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.$id}
          className={cn(
            "filter",
            activeCat === item.$id && "bg-amber-300 text-white",
          )}
          style={isIOS ? {} : { elevation: 10, shadowColor: "#878787" }}
          onPress={() => handleChangeCategory(item.$id)}
        >
          <Text className={cn("body-medium")}>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(cat) => cat.$id}
    />
  )
}

export default Filter
