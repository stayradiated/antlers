import { errorBoundary } from '@stayradiated/error-boundary'
import { sign } from './imaginary'
import { getCache } from './cache'
import { $FetchImageInfoResult } from './types'
import type { FetchImageInfoResult } from './types'
import { withDebugTime } from '~/lib/debug'

type ImageInfoOptions = {
  source: string
}

const forceFetchImageInfo = withDebugTime(
  async (source: string): Promise<FetchImageInfoResult | Error> => {
    const url = sign('/info', source, {})

    const content = await errorBoundary(async () => {
      const response = await fetch(url)
      if (response.status >= 400) {
        throw new Error(
          `forceFetchImageInfo: Received ${response.status}: ${response.statusText}`,
        )
      }

      const responseText = await response.text()

      const content = $FetchImageInfoResult.parse(JSON.parse(responseText))
      return content
    })

    return content
  },
  (source) => `forceFetchImageInfo: ${source}`,
)

const fetchImageInfo = async (
  options: ImageInfoOptions,
): Promise<FetchImageInfoResult | Error> => {
  const { source } = options

  const cache = await getCache()
  const cacheKey = `info:${source}`
  const safeCachedResult = $FetchImageInfoResult.safeParse(
    await cache.get<FetchImageInfoResult>(cacheKey),
  )

  if (!safeCachedResult.success) {
    const result = await forceFetchImageInfo(source)
    if (!(result instanceof Error)) {
      await cache.set(cacheKey, result)
    }

    return result
  }

  const cachedResult = safeCachedResult.data

  return cachedResult
}

export { fetchImageInfo }
