import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { Alert, Text, View } from "react-native"

import CustomBtn from "@/components/CustomBtn"
import Input from "@/components/Input"
import { signUpSchema, type signUpSchemaType } from "../../feature/auth/schemas/auth.schema"
import { useSignup } from "../../feature/auth/hooks/useSignup"

export default function SignUp() {
  const router = useRouter()
  const { signup, loading } = useSignup()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const onSubmit = async (data: signUpSchemaType) => {
    try {
      await signup(data)
      Alert.alert("Success", "Account created successfully!")
      router.replace("/(tabs)")
    } catch (err: any) {
      const message = err?.message || "Something went wrong. Please try again."
      Alert.alert("Sign-up failed", message)
    }
  }

  return (
    <View className="flex-1 bg-white px-6 pt-10 gap-8">
      <View className="items-center mb-6">

        <Text className="text-3xl font-bold text-gray-800">Welcome back</Text>
        <Text className="text-base text-gray-500 mt-2">
          Sign up to continue
        </Text>
      </View>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            label="name"
            placeholder="hello@example.com"
            value={value}
            onChangeText={onChange}
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="name"
            error={errors.name?.message}
            editable={!loading}
          />
        )}
      />
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
        <Text className="text-white text-base">Sign Up</Text>
      </CustomBtn>

      <View className="flex-row justify-center items-center gap-1.5 mt-6">
        <Text className="text-gray-600 text-base">
          Already have an account?
        </Text>
        <Link href="/sign-in" asChild>
          <Text className="text-primary font-semibold text-base">Sign in</Text>
        </Link>
      </View>
    </View>
  )
}
