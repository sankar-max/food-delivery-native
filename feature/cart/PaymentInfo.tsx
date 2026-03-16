import { Text, View } from "react-native"
import React from "react"
import { cn } from "@/lib/cn"

type Props = {
  label: string
  value: string
  labelStyle?: string
  valueStyle?: string
}

const PaymentInfo = ({ label, value, labelStyle, valueStyle }: Props) => {
  return (
    <View className="justify-between  flex-row my-1">
      <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
        {label}
      </Text>
      <Text className={cn("paragraph-medium text-dark-100", valueStyle)}>
        {value}
      </Text>
    </View>
  )
}

export default PaymentInfo
