import Input from "@/components/Input"
import { images } from "@/constants"
import { router, useLocalSearchParams } from "expo-router"
import React, { useState } from "react"
import { Image, TouchableOpacity, View } from "react-native"

type SearchParams = {
  query: string
}
const Search = () => {
  const searchParams = useLocalSearchParams<SearchParams>()
  const [search, setSearch] = useState(searchParams.query || "")

  const handleSearch = (value: string) => {
    setSearch(value)
    if (!value) router.setParams({ query: "" })
    router.setParams({ query: value })
  }

  const handleSubmit = () => {
    if (!search) return
    if (search.trim()) {
      router.setParams({ query: search })
    }
  }
  return (
    <View className="searchbar">
      <Input
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
        placeholder="Search for pizza, burgers ..."
        value={search}
        onChangeText={handleSearch}
      />
      <TouchableOpacity onPress={handleSubmit} className="pr-5">
        <Image
          source={images.search}
          className="size-7"
          resizeMode="contain"
          tintColor={"#5D5F6D"}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Search
