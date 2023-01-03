import { setTimeout } from 'node:timers/promises'
import * as z from 'zod'
import { withDebugTime } from '../debug'
import { CONTENT_HOST } from '../config.server'
import { getCache } from './cache'
import { calcHash } from './hash'

const $FetchContentResult = z.object({
  createdAt: z.date(),
  etag: z.string().optional(),
  responseHash: z.string(),
  responseText: z.string(),
})
type FetchContentResult = z.infer<typeof $FetchContentResult>

type FetchContentOptions = {
  pageId: string
}

const forceFetchContent = withDebugTime(
  async (
    options: FetchContentOptions,
    previousResult?: FetchContentResult,
  ): Promise<FetchContentResult> => {
    const { pageId } = options
    const createdAt = new Date()
    const headers = new Headers()
    if (typeof previousResult?.etag === 'string') {
      headers.set('If-None-Match', previousResult.etag)
    }

    const response = await fetch(`${CONTENT_HOST}${pageId}`, { headers })

    if (response.status >= 400) {
      throw new Error(
        `Could not fetch content: ${response.status} ${response.statusText}`,
      )
    }

    // 304 Not Modified
    if (previousResult && response.status === 304) {
      return previousResult
    }

    const responseText = await response.text()
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

const fetchContent = withDebugTime(
  async (options: FetchContentOptions): Promise<FetchContentResult> => {
    const { pageId } = options

    const cache = await getCache()
    const cacheKey = `fetchContent:${pageId}`
    const safeCachedResult = $FetchContentResult.safeParse(
      await cache.get<FetchContentResult>(cacheKey),
    )

    if (!safeCachedResult.success) {
      const result = await forceFetchContent(options)
      await cache.set(cacheKey, result)
      return result
    }

    const cachedResult = safeCachedResult.data

    void (async function () {
      await setTimeout(Math.random() * 10_000)
      const updatedResult = await forceFetchContent(options, cachedResult)
      if (updatedResult !== cachedResult) {
        await cache.set(cacheKey, updatedResult)
        return updatedResult
      }
    })()

    return cachedResult
  },
  (options) => `fetchContent: ${options.pageId}`,
)

export { fetchContent }
