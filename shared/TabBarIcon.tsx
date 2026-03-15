import { cn } from "@/lib/cn"
import { memo } from "react"
import { Image, ImageSourcePropType, Text, View } from "react-native"
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated"

type TabBarIconProps = {
  focused: boolean
  icon: ImageSourcePropType
  name: string
  size: number
}

function TabBarIcon({ focused, icon, name, size }: TabBarIconProps) {
  const animatedScale = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(focused ? 1.15 : 1) }],
  }))

  const displayName =
    name === "index" ? "Home" : name.charAt(0).toUpperCase() + name.slice(1)

  return (
    <View className="items-center justify-center min-w-[70px]">
      <Animated.View
        style={[
          animatedScale,
          focused
            ? { backgroundColor: "#FE8C0015", borderRadius: 16, padding: 6 }
            : { padding: 6 },
        ]}
      >
        <Image
          source={icon}
          tintColor={focused ? "#FE8C00" : "#A1A1A1"}
          resizeMode="contain"
          style={{ width: size - 4, height: size - 4 }}
        />
      </Animated.View>

      <Text
        numberOfLines={1}
        className={cn(
          "text-[10px] font-quicksand-bold uppercase tracking-wider mt-0.5",
          focused ? "text-primary" : "text-gray-100",
        )}
      >
        {displayName}
      </Text>
    </View>
  )
}

export default memo(TabBarIcon)
