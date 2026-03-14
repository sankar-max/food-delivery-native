// lib/queryClient.ts
import AsyncStorage from "@react-native-async-storage/async-storage"
import NetInfo from "@react-native-community/netinfo"
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import { onlineManager, QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client" // ← this import

// Network awareness
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected && !!state.isInternetReachable)
  })
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 3, // 3 days
      staleTime: 1000 * 60 * 5, // 5 min
      refetchOnWindowFocus: false,
      networkMode: "offlineFirst",
    },
  },
})

export const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 2000, // performance
})

export { PersistQueryClientProvider }
