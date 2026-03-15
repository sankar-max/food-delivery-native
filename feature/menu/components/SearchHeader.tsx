import CartBtn from "@/components/CartBtn"
import Filter from "@/shared/Filter"
import Search from "@/shared/Search"
import Skeleton from "@/shared/Skeleton"
import React from "react"
import { Text, View } from "react-native"
import { Category } from "../types"

interface SearchHeaderProps {
  categories?: Category[]
  isLoading?: boolean
}

const SearchHeader = ({ categories, isLoading }: SearchHeaderProps) => {
  return (
    <View className="my-6 gap-y-7">
      <View className="flex-between flex-row w-full px-1">
        <View>
          <Text className="h1-bold">Dish Discovery</Text>
          <View className="flex-row items-center gap-x-1.5 mt-1">
            <View className="size-1.5 bg-success rounded-full" />
            <Text className="body-medium text-gray-100">
              Find the best flavor today
            </Text>
          </View>
        </View>
        <CartBtn />
      </View>

      <View className="gap-y-6">
        <Search />

        <View>
          <Text className="paragraph-semibold text-dark-100 mb-4 px-1">
            Explore Categories
          </Text>
          {isLoading ? (
            <View className="flex-row gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} width={100} height={40} borderRadius={20} />
              ))}
            </View>
          ) : (
            <Filter categories={categories || []} />
          )}
        </View>
      </View>
    </View>
  )
}

export default SearchHeader
