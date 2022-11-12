import * as z from 'zod'
import * as dF from 'date-fns'
import validator from 'validator'
import {
  createCacheUrlMap,
  transformImage,
  updateCache,
} from '@stayradiated/preprocess-markdown'
import { CACHE_DIR_PATH, CONTENT_HOST, CACHE_HOST } from './config.server'
import { cache } from './cache.server'

const historyFileItemSchema = z.object({
  arrivedAt: z.string().refine((value) => {
    return validator.isISO8601(value)
  }),
  location: z.string(),
  country: z.string(),
  href: z.string().optional(),
  image: z.string().optional(),
})
type HistoryFileItem = z.infer<typeof historyFileItemSchema>

const historyFileSchema = z.array(historyFileItemSchema)
type HistoryFile = z.infer<typeof historyFileSchema>

type HistoryItem = {
  arrivedAt: Date
  location: string
  departedAt: Date | undefined
  days: number
  country?: string
  href?: string
  image?: string
}
type History = HistoryItem[]

const fetchHistoryFile = async (): Promise<HistoryFile | Error> => {
  const response = await fetch(new URL('index.json', CONTENT_HOST))
  const historyJson: unknown = await response.json()
  const result = historyFileSchema.safeParse(historyJson)
  if (!result.success) {
    return result.error
  }

  return result.data
}

type FetchHistoryOptions = {
  ignoreCache?: boolean
}

const fetchHistory = async (
  options: FetchHistoryOptions,
): Promise<History | Error> => {
  const { ignoreCache } = options

  return cache.get({
    key: 'history:index',
    ignoreCache,
    async getValue() {
      const historyFile = await fetchHistoryFile()
      if (historyFile instanceof Error) {
        return historyFile
      }

      const cacheUrlMap = createCacheUrlMap()

      const results = historyFile
        .sort((a, b) => {
          return a.arrivedAt > b.arrivedAt ? -1 : 1
        })
        .map((item, index) => {
          const nextDestination = historyFile[index - 1]
          const arrivedAt = dF.parseISO(item.arrivedAt)
          const departedAt = nextDestination
            ? dF.parseISO(nextDestination.arrivedAt)
            : undefined
          const days = dF.differenceInDays(departedAt ?? new Date(), arrivedAt)

          const cachedImageUrl = item.image
            ? transformImage({
                cacheDirPath: CACHE_DIR_PATH,
                cacheHost: CACHE_HOST,
                cacheUrlMap,
                imageUrl: item.image,
              })
            : undefined

          return {
            arrivedAt,
            departedAt,
            days,
            location: item.location,
            country: item.country,
            href: item.href,
            image: cachedImageUrl,
          }
        })

      // Run in background
      void updateCache({
        cacheUrlMap,
        cacheDirPath: CACHE_DIR_PATH,
        imageResolutionList: [500, 750, 1000, 1280, 1500, 2000, 2500],
      }).then(
        () => {
          console.log('Finished updating cache')
        },
        (error: unknown) => {
          console.error(error)
        },
      )

      return results
    },
  })
}

export { fetchHistory, fetchHistoryFile }
export type { HistoryFile, HistoryFileItem, History, HistoryItem }
