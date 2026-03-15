import { images } from "@/constants"
import { useAuthStore } from "@/feature/store/auth.store"
import { cn } from "@/lib/cn"
import { Redirect, Tabs } from "expo-router"
import React from "react"
import { Image, ImageSourcePropType, Text, View } from "react-native"

const Layout = () => {
  const { isAuthenticated, user } = useAuthStore()
  console.log("sankar", JSON.stringify(user, null, 2))
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-up" />
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          height: 65,
          padding: 0,
          borderRadius: 50,
          marginHorizontal: 10,
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
        },
      }}
    >
      {data.map((item) => (
        <Tabs.Screen
          name={item.name}
          key={item.name}
          options={{
            title: item.title,

            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} icon={item.icon} name={item.name} />
            ),
          }}
        />
      ))}
    </Tabs>
  )
}

export default Layout

const data = [
  { name: "index", title: "Home", icon: images.home, href: "/" },
  { name: "search", title: "Search", icon: images.search, href: "/search" },
  { name: "cart", title: "Cart", icon: images.bag, href: "/cart" },
  { name: "profile", title: "Profile", icon: images.user, href: "/profile" },
]

const TabBarIcon = ({
  focused,
  icon,
  name,
}: {
  focused: boolean
  icon: ImageSourcePropType
  name: string
}) => {
  return (
    <View className="tab-icon">
      <Image
        source={icon}
        tintColor={focused ? "#000" : "#999"}
        className="size-7"
        resizeMode="contain"
        alt={name}
        width={24}
        height={24}
      />
      <Text
        className={cn(
          "text-sm font-bold",
          focused ? "text-dark-100" : "text-gray-500",
        )}
      >
        {name}
      </Text>
    </View>
  )
}
