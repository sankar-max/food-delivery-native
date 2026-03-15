import HomeHeader from "@/feature/menu/components/HomeHeader"
import { images, offers } from "@/constants"
import { useAuthStore } from "@/feature/store/auth.store"
import cn from "clsx"
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
export default function Index() {
  const { user } = useAuthStore()
  return (
    <SafeAreaView className="bg-white flex-1">
      <FlatList
        ListHeaderComponent={<HomeHeader username={user?.username} />}
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0
          return (
            <Pressable
              className={cn(
                "offer-card",
                isEven ? "flex-row-reverse" : "flex-row",
              )}
              style={{ backgroundColor: item.color }}
              android_ripple={{ color: "#ffffff22" }}
            >
              <View className="h-full w-[45%] items-center justify-center">
                <Image
                  className="size-[80%]"
                  resizeMode="contain"
                  source={item.image}
                />
              </View>
              <View
                className={cn(
                  "offer-card__info",
                  isEven ? "pl-8" : "pr-8",
                )}
              >
                <View className="bg-white/20 px-2 py-0.5 rounded-md self-start">
                  <Text className="text-[10px] font-quicksand-bold text-white uppercase tracking-tighter">Limited Time</Text>
                </View>
                <Text className="text-2xl font-quicksand-bold text-white leading-[1.1]">
                  {item.title}
                </Text>
                <TouchableOpacity className="mt-2 bg-white/20 px-4 py-2 rounded-xl flex-row items-center gap-x-2">
                  <Text className="text-xs font-quicksand-bold text-white">Get Now</Text>
                  <Image
                    source={images.arrowRight}
                    className="size-3"
                    resizeMode="contain"
                    tintColor={"#ffffff"}
                  />
                </TouchableOpacity>
              </View>
            </Pressable>
          )
        }}
        contentContainerClassName="pb-28 px-5"
      />
    </SafeAreaView>
  )
}
