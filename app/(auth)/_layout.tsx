import { images } from "@/constants"
import { useAuthStore } from "@/feature/store/auth.store"
import { Redirect, Slot } from "expo-router"
import React from "react"
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native"

const AuthLayout = () => {
  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)
  const isAuthenticated = !!user
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    )
  }
  if (isAuthenticated) {
    return <Redirect href="/" />
  }
  const ios = Platform.OS === "ios"

  const dimensionHeight = Dimensions.get("screen").height / 2.15
  return (
    <KeyboardAvoidingView behavior={ios ? "padding" : "height"}>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        className="bg-white h-full"
      >
        <View className="w-full relative" style={{ height: dimensionHeight }}>
          <ImageBackground
            className={"size-full rounded-b-lg"}
            resizeMode="contain"
            source={images.loginGraphic}
          />
          <Image
            source={images.logo}
            className="self-center size-48 absolute -bottom-16 z-15"
          />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AuthLayout
