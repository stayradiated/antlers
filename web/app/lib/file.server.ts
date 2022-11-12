import { transformMarkdown, updateCache } from './preprocess.server'
import { CACHE_DIR_PATH, CONTENT_HOST } from './config.server'
import { cache } from './cache.server'

type GetPageOptions = {
  pageId: string
  ignoreCache?: boolean
}

const getPage = async (options: GetPageOptions) => {
  const { pageId, ignoreCache } = options

  const { markdown } = await cache.get({
    key: `page:${pageId}`,
    ignoreCache,
    async getValue() {
      const response = await fetch(`${CONTENT_HOST}${pageId}`)

      const { markdown, cacheUrlMap } = await transformMarkdown({
        input: await response.text(),
        cacheDirPath: CACHE_DIR_PATH,
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

      return { markdown }
    },
  })

  return { markdown }
}

export { getPage }
