import CartBtn from "@/components/CartBtn"
import Search from "@/shared/Search"
import Filter from "@/shared/Filter"
import React from "react"
import { Text, View } from "react-native"
import { Category } from "../types"
import Skeleton from "@/shared/Skeleton"

interface SearchHeaderProps {
  categories?: Category[]
  isLoading?: boolean
}

const SearchHeader = ({ categories, isLoading }: SearchHeaderProps) => {
  return (
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
      {isLoading ? (
        <View className="flex-row gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} width={80} height={35} borderRadius={18} />
          ))}
        </View>
      ) : (
        <Filter categories={categories} />
      )}
    </View>
  )
}

export default SearchHeader
