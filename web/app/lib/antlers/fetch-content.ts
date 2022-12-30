import * as crypto from 'node:crypto'
import * as z from 'zod'
import { withDebugTime } from '../debug'
import { getCache } from './cache'

const $FetchContentResult = z.object({
  createdAt: z.date(),
  etag: z.string().optional(),
  responseHash: z.string(),
  responseText: z.string(),
})
type FetchContentResult = z.infer<typeof $FetchContentResult>

const getCacheKey = (contentHost: string, fileName: string): string => {
  return `fetchContent:${contentHost}${fileName}`
}

type FetchContentOptions = {
  pageId: string
  contentHost: string
}

const forceFetchContent = withDebugTime(
  async (
    options: FetchContentOptions,
    previousResult?: FetchContentResult,
  ): Promise<FetchContentResult> => {
    const { contentHost, pageId } = options
    const createdAt = new Date()
    const headers = new Headers()
    if (typeof previousResult?.etag === 'string') {
      headers.set('If-None-Match', previousResult.etag)
    }

    const response = await fetch(`${contentHost}${pageId}`, { headers })

    // 304 Not Modified
    if (previousResult && response.status === 304) {
      return previousResult
    }

    const responseText = await response.text()
    const responseHash = crypto
      .createHash('sha256')
      .update(responseText)
      .digest()
      .toString('base64')

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
    const { contentHost, pageId } = options

    const cache = await getCache()
    const cacheKey = getCacheKey(contentHost, pageId)
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
