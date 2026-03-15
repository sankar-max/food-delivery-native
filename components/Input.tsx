import { cn } from "@/lib/cn"
import React, { forwardRef, useState } from "react"
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableWithoutFeedback,
  View,
} from "react-native"

export interface InputProps extends Omit<
  TextInputProps,
  "onChange" | "onChangeText" | "value"
> {
  label?: string
  error?: string
  value: string
  onChangeText?: (text: string) => void
  containerClassName?: string
  inputClassName?: string
  labelClassName?: string
  errorClassName?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onRightIconPress?: () => void
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      value,
      onChangeText,
      placeholder = "Enter value...",
      placeholderTextColor = "#9ca3af", // gray-400
      secureTextEntry = false,
      keyboardType = "default",
      autoCapitalize = "none",
      autoCorrect = false,
      containerClassName = "",
      inputClassName = "",
      labelClassName = "",
      errorClassName = "",
      leftIcon,
      rightIcon,
      onRightIconPress,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasError = !!error

    return (
      <View className={cn("w-full gap-1.5", containerClassName)}>
        {/* Label */}
        {label && (
          <Text
            className={cn(
              "text-sm font-medium",
              hasError
                ? "text-red-600"
                : isFocused
                  ? "text-blue-600" // or your primary color
                  : "text-gray-700",
              labelClassName,
            )}
          >
            {label}
          </Text>
        )}

        {/* Input wrapper */}
        <View
          className={cn(
            "flex-row items-center rounded-lg border bg-white px-4 ",
            isFocused ? "border-primary" : "border-gray-300",
            hasError ? "border-red-500 bg-red-50/40" : "",
            (leftIcon || rightIcon) && "gap-3",
            inputClassName,
          )}
        >
          {/* Left Icon */}
          {leftIcon && <View className="opacity-80">{leftIcon}</View>}

          {/* TextInput */}
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            autoComplete="off"
            selectionColor="#3b82f6" // blue-500
            className={cn(
              "flex-1 text-base text-gray-900",
              hasError && "text-red-700",
              inputClassName,
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />

          {/* Right Icon (e.g. eye for password) */}
          {rightIcon && (
            <TouchableWithoutFeedback onPress={onRightIconPress}>
              <View className="p-1">{rightIcon}</View>
            </TouchableWithoutFeedback>
          )}
        </View>

        {/* Error message */}
        {hasError && (
          <Text className={cn("text-sm text-red-600 mt-1.5", errorClassName)}>
            {error}
          </Text>
        )}
      </View>
    )
  },
)

Input.displayName = "Input"

export default Input
