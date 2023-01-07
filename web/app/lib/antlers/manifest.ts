import debounce from 'p-debounce'
import { CONTENT_HOST } from '../config.server'
import { getCache } from './cache.js'
import { $FetchContentResult } from './types.js'
import type { FetchContentResult } from './types.js'
import { getOnce } from './persist.js'

type ManifestEntry = {
  hash: string
  filepath: string
}
type Manifest = ManifestEntry[]

const parseManifest = (input: string): Manifest => {
  const lines = input.split('\n')
  return lines
    .map((line) => {
      const match = /^([a-z\d/+=]{44})\s+(\S+\.md)$/i.exec(line)
      if (!match) {
        return undefined
      }

      const hash = match[1]
      const filepath = match[2]

      return {
        hash,
        filepath,
      }
    })
    .filter((item): item is ManifestEntry => {
      return typeof item !== 'undefined'
    })
}

const fetchManifest = async (): Promise<Manifest> => {
  const url = `${CONTENT_HOST}manifest.txt`
  const response = await fetch(url)
  const responseText = await response.text()
  const manifest = parseManifest(responseText)
  return manifest
}

const forceRefreshManifest = async () => {
  const cache = await getCache()

  const manifest = await fetchManifest()

  await Promise.all(
    manifest.map(async (entry) => {
      const cacheKey = `fetchContent:${entry.filepath}`
      const content = $FetchContentResult.safeParse(
        await cache.get<FetchContentResult>(cacheKey),
      )
      if (content.success && content.data.responseHash !== entry.hash) {
        console.log(`Deleting content cache for ${entry.filepath}`)
        await cache.del(cacheKey)
      }
    }),
  )
}

const refreshManifest = getOnce('manifest:debounce', () =>
  debounce(forceRefreshManifest, 1000, { before: true }),
)

export { refreshManifest }
