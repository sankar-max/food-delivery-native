import { Category } from "@/feature/menu/types"
import { cn } from "@/lib/cn"
import { router, useLocalSearchParams } from "expo-router"
import React from "react"
import { FlatList, Platform, Text, TouchableOpacity } from "react-native"

type Props = {
  categories: Category[]
}
const Filter = ({ categories }: Props) => {
  const { category: activeCat } = useLocalSearchParams<{ category: string }>()
  const isIOS = Platform.OS === "ios"

  const handleChangeCategory = (category: string) => {
    router.setParams({ category: category === activeCat ? "" : category })
  }

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={categories}
      contentContainerClassName="px-1 py-2"
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.$id}
          activeOpacity={0.8}
          className={cn(
            "filter",
            activeCat === item.$id ? "bg-primary border-primary" : "bg-white",
          )}
          style={isIOS ? {} : { elevation: 10, shadowColor: "#878787" }}
          onPress={() => handleChangeCategory(item.$id)}
        >
          <Text
            className={cn(
              "body-medium",
              activeCat === item.$id
                ? "text-white font-quicksand-bold"
                : "text-gray-100",
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(cat) => cat.$id}
    />
  )
}

export default Filter
