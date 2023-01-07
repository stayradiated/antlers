import { errorBoundary } from '@stayradiated/error-boundary'
import { withDebugTime } from '../debug'
import { CONTENT_HOST } from '../config.server'
import { getCache } from './cache'
import { calcHash } from './hash'
import { refreshManifest } from './manifest'
import { $FetchContentResult } from './types.js'
import type { FetchContentResult } from './types.js'

type FetchContentOptions = {
  pageId: string
}

const forceFetchContent = withDebugTime(
  async (
    options: FetchContentOptions,
    previousResult?: FetchContentResult,
  ): Promise<FetchContentResult | Error> => {
    const { pageId } = options
    const createdAt = new Date()
    const headers = new Headers()
    if (typeof previousResult?.etag === 'string') {
      headers.set('If-None-Match', previousResult.etag)
    }

    const response = await errorBoundary(async () =>
      fetch(`${CONTENT_HOST}${pageId}`, { headers }),
    )
    if (response instanceof Error) {
      return response
    }

    if (response.status >= 400) {
      return new Error(
        `Could not fetch content: ${response.status} ${response.statusText}`,
      )
    }

    // 304 Not Modified
    if (previousResult && response.status === 304) {
      return previousResult
    }

    const responseText = await errorBoundary(async () => response.text())
    if (responseText instanceof Error) {
      return responseText
    }

    const responseHash = calcHash(responseText)

    const etag = response.headers.get('ETag') ?? undefined

    return {
      createdAt,
      etag,
      responseText,
      responseHash,
    }
  },
  (options) => `forceFetchContent: ${options.pageId}`,
)

const fetchContent = async (
  options: FetchContentOptions,
): Promise<FetchContentResult | Error> => {
  const { pageId } = options

  const cache = await getCache()
  const cacheKey = `fetchContent:${pageId}`
  const safeCachedResult = $FetchContentResult.safeParse(
    await cache.get<FetchContentResult>(cacheKey),
  )

  if (!safeCachedResult.success) {
    const result = await forceFetchContent(options)
    if (!(result instanceof Error)) {
      await cache.set(cacheKey, result)
    }

    return result
  }

  const cachedResult = safeCachedResult.data

  void refreshManifest()

  return cachedResult
}

export { fetchContent }
