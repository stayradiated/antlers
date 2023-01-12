import sqliteStore from 'cache-manager-better-sqlite3'
import { caching, multiCaching, type MultiCache } from 'cache-manager'
import { CACHE_PATH } from '../config.server'
import { getOnce } from './persist.js'

const createCache = async (): Promise<MultiCache> => {
  const sqliteCache = await caching(sqliteStore, {
    name: 'cache',
    path: CACHE_PATH,
  })

  const memoryCache = await caching('memory', {
    max: 500,
  })

  const cache = multiCaching([memoryCache, sqliteCache])

  return cache
}

const getCache = async () => getOnce('cache', createCache)

export { getCache }
