import { data } from "@/constants/tabData"
import { useAuthStore } from "@/feature/store/auth.store"
import TabBarIcon from "@/shared/TabBarIcon"
import { Redirect, Tabs } from "expo-router"
import { ActivityIndicator, View } from "react-native"

const Layout = () => {
  const user = useAuthStore((s) => s.user)
  const isLoading = useAuthStore((s) => s.isLoading)
  const isAuthenticated = !!user
  if (isLoading) {
    return (
      <View className="items-center justify-center h-full">
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-up" />
  }

  return (
    <Tabs
      initialRouteName="search"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          height: 80,
          borderRadius: 40,
          marginHorizontal: 16,
          bottom: 25,
          position: "absolute",

          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          elevation: 12,
          paddingTop: 0,
          paddingBottom: 0,
        },
        tabBarItemStyle: {
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 0,
        },
        tabBarIconStyle: {
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      {data.map((item) => (
        <Tabs.Screen
          name={item.name}
          key={item.name}
          options={{
            title: item.title,
            tabBarIcon: ({ focused, size }) => (
              <TabBarIcon
                focused={focused}
                icon={item.icon}
                name={item.name}
                size={size}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  )
}

export default Layout
