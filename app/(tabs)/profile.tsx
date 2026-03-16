import CustomBtn from "@/components/CustomBtn"
import { useAuthStore } from "@/feature/store/auth.store"
import Feather from "@expo/vector-icons/Feather"
import { Image } from "expo-image"
import type React from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type IconName = React.ComponentProps<typeof Feather>["name"]

interface MenuItem {
  id: string
  icon: IconName
  label: string
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "personal-info",
    icon: "user",
    label: "Personal Info",
  },
  {
    id: "addresses",
    icon: "map-pin",
    label: "Addresses",
  },
  {
    id: "payment-methods",
    icon: "credit-card",
    label: "Payment Methods",
  },
  {
    id: "order-history",
    icon: "shopping-bag",
    label: "Order History",
  },
  {
    id: "notifications",
    icon: "bell",
    label: "Notifications",
  },
  {
    id: "settings",
    icon: "settings",
    label: "Settings",
  },
]

const Profile = () => {
  const { user, logout } = useAuthStore()

  const formattedDob = user?.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  const handleLogout = () => {
    logout()
  }

  return (
    <SafeAreaView className="flex-1 bg-white-100" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-6 flex-row items-center justify-between">
          <Text className="text-2xl font-quicksand-bold text-dark-100">
            Profile
          </Text>
          <TouchableOpacity
            className="w-10 h-10 bg-white rounded-full items-center justify-center"
            style={{
              shadowColor: "#878787",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 4,
            }}
          >
            <Feather name="more-vertical" size={20} color="#181C2E" />
          </TouchableOpacity>
        </View>

        {/* User Card */}
        <View className="px-6 mb-8">
          <View
            className="bg-white rounded-3xl p-6 items-center"
            style={{
              shadowColor: "#878787",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <View className="relative">
              {/* <Image
                source={user?.avatar_url}
                contentFit="cover"
                transition={300}
                className="w-24 h-24 rounded-full bg-gray-100/20"
              /> */}
              <View className="size-16 rounded-full bg-gray-100/20 items-center justify-center">
                <Feather name="user" size={20} color="#878787" />
              </View>
            </View>

            <View className="items-center mt-4">
              <Text className="text-xl font-quicksand-bold text-dark-100">
                {user?.username || "Guest User"}
              </Text>
              <Text className="text-sm font-quicksand-medium text-gray-200 mt-1">
                {user?.email || "No email provided"}
              </Text>
              {formattedDob && (
                <Text className="text-xs font-quicksand text-gray-200 mt-1">
                  Born: {formattedDob}
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-6 mb-8 gap-y-3">
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              className="flex-row items-center justify-between bg-white px-5 py-4 rounded-2xl"
              style={{
                shadowColor: "#878787",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center gap-x-4">
                <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center">
                  <Feather name={item.icon} size={18} color="#FE8C00" />
                </View>
                <Text className="text-base font-quicksand-bold text-dark-100">
                  {item.label}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#878787" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View className="px-6">
          <CustomBtn
            fullWidth
            variant="outline"
            onPress={handleLogout}
            leftIcon={<Feather name="log-out" size={18} color="#F14141" />}
            className="border-error/30 bg-error/5 py-4 min-h-[56px] rounded-2xl"
          >
            <Text className="text-error font-quicksand-bold text-base ml-2">
              Log Out
            </Text>
          </CustomBtn>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
