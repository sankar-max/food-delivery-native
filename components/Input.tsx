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
      <View className={cn("w-full gap-2", containerClassName)}>
        {/* Label */}
        {label && (
          <Text
            className={cn(
              "text-sm font-quicksand-semibold",
              hasError
                ? "text-error"
                : isFocused
                  ? "text-primary"
                  : "text-gray-100",
              labelClassName,
            )}
          >
            {label}
          </Text>
        )}

        {/* Input wrapper */}
        <View
          className={cn(
            "flex-row items-center rounded-2xl border bg-white px-5 py-0.5",
            isFocused ? "border-primary" : "border-gray-100/10",
            hasError ? "border-error bg-error/5" : "",
            (leftIcon || rightIcon) && "gap-4",
            inputClassName,
          )}
        >
          {/* Left Icon */}
          {leftIcon && <View className="opacity-70">{leftIcon}</View>}

          {/* TextInput */}
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={"#878787"}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            autoComplete="off"
            selectionColor="#FE8C00"
            className={cn(
              "flex-1 text-base font-quicksand-semibold text-dark-100",
              hasError && "text-error",
              inputClassName,
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
          />

          {/* Right Icon (e.g. eye for password) */}
          {rightIcon && (
            <TouchableWithoutFeedback onPress={onRightIconPress}>
              <View className="p-1 opacity-70">{rightIcon}</View>
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
