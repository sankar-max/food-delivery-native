import { useAuthStore } from "@/feature/store/auth.store"
import { Redirect, Slot } from "expo-router"
import React from "react"

const Layout = () => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-up" />
  }
  return <Slot />
}

export default Layout
