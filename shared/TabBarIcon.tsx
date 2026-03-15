import { cn } from "@/lib/cn"
import { memo } from "react"
import { Image, ImageSourcePropType, Text } from "react-native"
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated"

type TabBarIconProps = {
  focused: boolean
  icon: ImageSourcePropType
  name: string
  size: number
}

function TabBarIcon({ focused, icon, name, size }: TabBarIconProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(focused ? 1.1 : 1, {
            damping: 15,
            stiffness: 200,
          }),
        },
      ],
    }
  }, [focused])

  return (
    <Animated.View
      style={[
        {
          backgroundColor: focused ? "#f5f5f5" : "transparent",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 999,
          alignItems: "center",
          justifyContent: "center",
        },
        animatedStyle,
      ]}
      className="tab-icon overflow-hidden"
    >
      <Image
        source={icon}
        tintColor={focused ? "#FE8C00" : "#94a3b8"}
        resizeMode="contain"
        style={{ width: size, height: size }}
      />

      <Text
        className={cn(
          "text-center text-xs font-quicksand-semibold",
          focused ? "text-primary" : "text-slate-400",
        )}
      >
        {name}
      </Text>

      {/* {focused && <View className="tab-icon__indicator" />} */}
    </Animated.View>
  )
}

export default memo(TabBarIcon)
