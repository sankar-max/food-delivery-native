import React, { useEffect } from "react"
import { Animated, View, ViewStyle } from "react-native"

interface SkeletonProps {
  width?: number | string
  height?: number | string
  borderRadius?: number
  style?: ViewStyle
}

const Skeleton = ({ width, height, borderRadius = 4, style }: SkeletonProps) => {
  const opacity = new Animated.Value(0.3)

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: "#E1E9EE",
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  )
}

export default Skeleton
