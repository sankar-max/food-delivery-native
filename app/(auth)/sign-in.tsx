import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { Alert, Text, View } from "react-native"

import CustomBtn from "@/components/CustomBtn"
import Input from "@/components/Input"
import {
  signInSchema,
  type signInSchemaType,
} from "../../feature/auth/schemas/auth.schema"
import { useLogin } from "../../feature/auth/hooks/useLogin"

export default function SignIn() {
  const router = useRouter()
  const { login, loading } = useLogin()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const onSubmit = async (data: signInSchemaType) => {
    try {
      await login(data)
      Alert.alert("Welcome back!", "You have signed in successfully.")
      router.replace("/")
    } catch (err: any) {
      const message = err?.message || "Something went wrong. Please try again."
      Alert.alert("Sign-in failed", message)
    }
  }

  return (
    <View className="flex-1 bg-white px-6 pt-10 gap-8">
      <View className="items-center mb-6">
        <Text className="text-3xl font-bold text-gray-800">Welcome back</Text>
        <Text className="text-base text-gray-500 mt-2">
          Sign in to continue
        </Text>
      </View>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Email"
            placeholder="hello@example.com"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            error={errors.email?.message}
            editable={!loading}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Password"
            placeholder="••••••••"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            autoCapitalize="none"
            error={errors.password?.message}
            editable={!loading}
          />
        )}
      />

      <View className="items-end">
        {/* <Link href="/forgot-password" asChild> */}
        <Text className="text-primary font-medium text-base">
          Forgot password?
        </Text>
        {/* </Link> */}
      </View>

      <CustomBtn
        onPress={handleSubmit(onSubmit)}
        isLoading={loading}
        disabled={loading}
        variant="primary"
        size="lg"
        className="mt-4 rounded-full"
      >
        <Text className="text-white text-base">Sign In</Text>
      </CustomBtn>

      <View className="flex-row justify-center items-center gap-1.5 mt-6">
        <Text className="text-gray-600 text-base">
          Don&apos;t have an account?
        </Text>
        <Link href="/sign-up" asChild>
          <Text className="text-primary font-semibold text-base">Sign up</Text>
        </Link>
      </View>
    </View>
  )
}
