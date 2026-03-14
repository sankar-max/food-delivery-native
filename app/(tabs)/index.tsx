import CartBtn from "@/components/CartBtn"
import { images, offers } from "@/constants"
import { useAuthStore } from "@/feature/store/auth.store"
import cn from "clsx"
import { Fragment } from "react"
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
        ListHeaderComponent={
          <View className="items-center  justify-between flex-row w-full my-5 ">
            <View className="items-ce justify-center">
              <View className="flex-row items-center gap-x-1">
                <Text>DELIVER TO</Text>
                <View className="bg-primary p-1 px-2  rounded-full block text-center ">
                  <Text className="text-white-100 text-xs">
                    {user?.username}
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="flex-row items-center gap-x-1">
                <Text>India</Text>
                <Image
                  source={images.arrowDown}
                  resizeMode="contain"
                  className="size-3"
                />
              </TouchableOpacity>
            </View>
            <CartBtn />
          </View>
        }
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
