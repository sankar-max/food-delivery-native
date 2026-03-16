import MenuCard from "@/shared/MenuCard"
import MenuCardSkeleton from "@/shared/MenuCardSkeleton"
import { useMenus } from "@/feature/menu/hooks/use-menus"
import { useCategories } from "@/feature/menu/hooks/use-categories"
import SearchHeader from "@/feature/menu/components/SearchHeader"
import { MenuItem } from "@/feature/menu/types"
import { useLocalSearchParams } from "expo-router"
import React from "react"
import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type SearchParams = {
  category: string
  query: string
}

const SearchScreen = () => {
  const { category, query } = useLocalSearchParams<SearchParams>()
  const { data: menus, isLoading: isLoadingMenus } = useMenus({
    category: category || "",
    query: query || "",
  })
  const { data: categories, isLoading: isLoadingCategories } = useCategories()

  console.log("new menus", JSON.stringify(menus?.[0], null, 2))
  return (
    <SafeAreaView className="bg-white flex-1">
      <FlatList
        data={isLoadingMenus ? Array(6).fill({}) : menus}
        renderItem={({ item, index }) => {
          if (isLoadingMenus) {
            const isOdd = index % 2 !== 0
            return (
              <View className={`flex-1 max-w-[48%] ${isOdd ? "mt-10" : ""}`}>
                <MenuCardSkeleton />
              </View>
            )
          }

          const isOdd = index % 2 !== 0
          return (
            <View className={`flex-1 max-w-[48%] ${isOdd ? "mt-10" : ""}`}>
              <MenuCard item={item as MenuItem} />
            </View>
          )
        }}
        keyExtractor={(item, index) =>
          isLoadingMenus ? `skeleton-${index}` : item.$id
        }
        numColumns={2}
        columnWrapperClassName="gap-3"
        contentContainerClassName="gap px-5 pb-32"
        ListHeaderComponent={() => (
          <SearchHeader
            categories={categories}
            isLoading={isLoadingCategories}
          />
        )}
        ListEmptyComponent={() => (
          <View className="flex-center">
            <Text>No menus found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default SearchScreen
