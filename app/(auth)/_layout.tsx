import { images } from "@/constants"
import { Slot } from "expo-router"
import React from "react"
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native"

const AuthLayout = () => {
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
