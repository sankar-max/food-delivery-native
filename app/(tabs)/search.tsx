import CartBtn from "@/components/CartBtn"
import { getCategoryQuery, getMenuQuery } from "@/lib/appwrite/menu/query"
import Filter from "@/shared/Filter"
import MenuCard, { MenuItem } from "@/shared/MenuCard"
import Search from "@/shared/Search"
import { useQuery } from "@tanstack/react-query"
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
  const { data: menus, isLoading: isLoadingMenus } = useQuery({
    queryKey: ["menus", category, query],
    queryFn: async () =>
      await getMenuQuery({ category: category || "", query: query || "" }),
    staleTime: 1000 * 60 * 10,
  })

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategoryQuery(),
  })
  // console.log("categories", categories)
  // if (isLoadingMenus) {
  //   return <Text>Loading...</Text>
  // }

  return (
    <SafeAreaView className="bg-white flex-1">
      <FlatList
        data={menus}
        renderItem={({ item, index }) => {
          const isOdd = index % 2 !== 0
          return (
            <View className={`flex-1 max-w-[48%] ${isOdd ? "mt-10" : ""}`}>
              <MenuCard item={item as MenuItem} />
            </View>
          )
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-3"
        contentContainerClassName="gap px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View>
                <Text className="small-bold gap--1 mt-0.5 text-primary font-bold">
                  Search
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favorite foods
                  </Text>
                </View>
              </View>
              <CartBtn />
            </View>
            <Search />
            <Filter categories={categories} />
          </View>
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
