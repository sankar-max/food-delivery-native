import { cn } from "@/lib/cn"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"
import { ActivityIndicator, TouchableOpacity, View } from "react-native"

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-md font-medium",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-gray-900",
        outline: "border border-gray-400 bg-transparent text-gray-900",
        ghost: "bg-transparent text-gray-900",
        destructive: "bg-red-600 text-white",
        link: "bg-transparent text-primary",
      },
      size: {
        sm: "min-h-9 px-4 text-sm",
        md: "min-h-10 px-5 text-base",
        lg: "min-h-12 px-8 text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)

export interface ButtonProps
  extends
    React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  // asChild?: boolean;  ← usually not needed in RN unless using composition
}

const CustomBtn = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  ButtonProps
>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      disabled = false,
      fullWidth = false,
      children,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading

    return (
      <TouchableOpacity
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && "w-full",
          isDisabled && "opacity-60",
          className,
        )}
        disabled={isDisabled}
        activeOpacity={0.75} // native press feedback
        {...props}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={
              variant === "outline" || variant === "ghost" || variant === "link"
                ? "#2563eb" // blue-600 or your primary
                : "white"
            }
          />
        ) : (
          <View className="flex-row items-center justify-center">
            {leftIcon && <View className="mr-2">{leftIcon}</View>}
            {children && <View>{children}</View>}
            {rightIcon && <View className="ml-2">{rightIcon}</View>}
          </View>
        )}
      </TouchableOpacity>
    )
  },
)

CustomBtn.displayName = "CustomBtn"

export default CustomBtn
