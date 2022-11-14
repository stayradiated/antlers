import type { Config } from '@markdoc/markdoc'
import Markdoc, { Tag } from '@markdoc/markdoc'
import {
  createCacheUrlMap,
  transformImage,
  updateCache,
} from '@stayradiated/preprocess-markdown'
import { cache } from './cache.server'
import { CACHE_DIR_PATH, CACHE_HOST, CONTENT_HOST } from './config.server'

type GetPageOptions = {
  pageId: string
  ignoreCache?: boolean
}

const getMarkdocPage = async (options: GetPageOptions) => {
  const { pageId, ignoreCache } = options

  const { content } = await cache.get({
    key: `markdoc:${pageId}`,
    ignoreCache,
    async getValue() {
      console.log('Fetching page')
      const response = await fetch(`${CONTENT_HOST}${pageId}`)
      const rawText = await response.text()

      const ast = Markdoc.parse(rawText)

      const cacheUrlMap = createCacheUrlMap()

      const config: Config = {
        tags: {
          location: {
            render: 'Location',
            children: [],
            attributes: {
              arriveAt: { type: String, required: true },
              departAt: { type: String },
              location: { type: String, required: true },
              country: { type: String, required: true },
              image: { type: String },
              imageAlignV: { type: Number },
              href: { type: String },
              size: { type: String, matches: ['large', 'small'] },
            },
          },
          map: {
            render: 'Map',
            children: [],
            attributes: {
              alt: { type: String, required: true },
              src: { type: String, required: true },
            },
          },
          strava: {
            render: 'Strava',
            children: [],
            attributes: {
              embedUrl: { type: String, required: true },
            },
          },
          place: {
            render: 'Place',
            children: ['tag'],
            attributes: {
              title: { type: String, required: true },
              category: { type: String, required: true },
              href: { type: String, required: true },
            },
          },
          tip: {
            render: 'Tip',
            children: ['tag'],
            attributes: {
              title: { type: String, required: true },
            },
          },
          extract: {
            render: 'Extract',
            children: ['tag'],
            attributes: {
              title: { type: String, required: true },
              href: { type: String, required: true },
            },
          },
          photo: {
            render: 'Photo',
            children: [],
            attributes: {
              caption: { type: String },
              src: { type: String, required: true },
              fullWidth: { type: Boolean, default: true },
            },
            transform(node, config) {
              const attributes = node.transformAttributes(config)
              const children = node.transformChildren(config)

              attributes.src = transformImage({
                cacheDirPath: CACHE_DIR_PATH,
                cacheHost: CACHE_HOST,
                cacheUrlMap,
                imageUrl: attributes.src as string,
              })

              return new Tag('Photo', attributes, children)
            },
          },
          accomodation: {
            render: 'Accomodation',
            children: ['photo'],
            attributes: {
              title: { type: String, required: true },
              review: { type: Number, required: true },
              nights: { type: Number, required: true },
              costPerNight: { type: String, required: true },
              linkHref: { type: String, required: true },
              linkText: { type: String, required: true },
              description: { type: String, required: true },
            },
          },
          row: {
            render: 'Row',
            children: ['tag'],
            attributes: {},
          },
        },
        nodes: {},
        variables: {},
      }

      const content = Markdoc.transform(ast, config)

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

      return { content }
    },
  })

  return { content }
}

export { getMarkdocPage }
