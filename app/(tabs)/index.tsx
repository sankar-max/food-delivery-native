import HomeHeader from "@/feature/menu/components/HomeHeader"
import { images, offers } from "@/constants"
import { useAuthStore } from "@/feature/store/auth.store"
import cn from "clsx"
import { Fragment } from "react"
import {
  FlatList,
  Image,
  Pressable,
  Text,
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
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row",
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#fffff22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className="h-full w-1/2">
                      <Image
                        className="size-full"
                        resizeMode="contain"
                        source={item.image}
                      />
                    </View>
                    <View
                      className={cn(
                        "offer-card__info",
                        isEven ? "pl-10" : "pr-10",
                      )}
                    >
                      <Text className="h1-bold text-white-100 leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="size-12"
                        resizeMode="contain"
                        tintColor={"#ffffff"}
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          )
        }}
        contentContainerClassName="pb-28 px-5"
      />
    </SafeAreaView>
  )
}
