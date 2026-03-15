import Input from "@/components/Input"
import { images } from "@/constants"
import { router, useLocalSearchParams } from "expo-router"
import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

type SearchParams = {
  query: string
}
const Search = () => {
  const searchParams = useLocalSearchParams<SearchParams>()
  const [search, setSearch] = useState(searchParams.query || "")

  const handleSearch = (value: string) => {
    setSearch(value)
    router.setParams({ query: value || "" })
  }

  const handleSubmit = () => {
    if (!search) return
    if (search.trim()) {
      router.setParams({ query: search })
    }
  }
  return (
    <View className="px-1">
      <Input
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        placeholder="Search for pizza, burgers ..."
        value={search}
        onChangeText={handleSearch}
        containerClassName="w-full"
        inputClassName="h-14"
        leftIcon={
          <Image
            source={images.search}
            className="size-5"
            resizeMode="contain"
            tintColor={"#FE8C00"}
          />
        }
        rightIcon={
          search.length > 0 ? (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Text className="text-gray-100 text-xs font-quicksand-bold">CLEAR</Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  )
}

export default Search
