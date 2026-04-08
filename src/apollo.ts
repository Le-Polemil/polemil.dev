import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client"
import { LocalStorageWrapper, persistCache } from "apollo3-cache-persist"
import { GRAPHQL_URL } from "@/lib"

const cache = new InMemoryCache()

let client: ApolloClient<NormalizedCacheObject>

export async function initApolloClient() {
  if (typeof window !== "undefined") {
    await persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
      maxSize: 1048576, // 1MB
    })
  }

  client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  })

  return client
}

export default function getClient() {
  return client
}
