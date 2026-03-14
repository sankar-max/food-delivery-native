import { useAuthStore } from "@/feature/store/auth.store"
import {
  PersistQueryClientProvider,
  persister,
  queryClient,
} from "@/lib/queryClient"
import { useReactQueryDevTools } from "@dev-plugins/react-query"
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router"
import { useEffect } from "react"
import "./global.css"

export default function RootLayout() {
  const { fetchUser, isLoading, user } = useAuthStore()
  useReactQueryDevTools(queryClient)

  const [fontsLoaded, fontError] = useFonts({
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  })

  useEffect(() => {
    if (fontError) throw fontError
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, fontError])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (!fontsLoaded && !fontError) {
    return null
  }
  if (isLoading || !fontsLoaded) {
    return null
  }
  console.log(user)

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => queryClient.resumePausedMutations()}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </PersistQueryClientProvider>
  )
}
