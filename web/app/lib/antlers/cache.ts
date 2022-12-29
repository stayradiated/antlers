import sqliteStore from 'cache-manager-better-sqlite3'
import { caching, multiCaching, type MultiCache } from 'cache-manager'

const createCache = async (): Promise<MultiCache> => {
  const sqliteCache = await caching(sqliteStore, {
    name: 'cache',
    path: './cache.db',
  })

  const memoryCache = await caching('memory', {
    max: 500,
  })

  const cache = multiCaching([memoryCache, sqliteCache])

  return cache
}

declare global {
  var __cache: Promise<MultiCache> | undefined
}

if (!global.__cache) {
  global.__cache = createCache()
}

const getCache = async () => global.__cache!

export { getCache }
