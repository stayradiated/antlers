import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { RenderableTreeNode, ValidateError } from '@markdoc/markdoc'

import PhotoSwipeCSS from 'photoswipe/dist/photoswipe.css'
import { MarkdocErrorList, MarkdocCSS } from '~/components/markdoc'

import { Page, PageCSS } from '~/components/page'
import { BitCSS } from '~/components/bit'

import {
  fetchContent,
  transformMarkdoc,
  getCache,
  type References,
} from '~/lib/antlers.server'
import { usePhotoSwipe } from '~/hooks/use-photo-swipe'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: PhotoSwipeCSS },
  { rel: 'stylesheet', href: PageCSS },
  { rel: 'stylesheet', href: BitCSS },
  { rel: 'stylesheet', href: MarkdocCSS },
]

type LoaderData =
  | {
      success: true
      renderableTreeNode: RenderableTreeNode
      references: References
    }
  | {
      success: false
      errors: ValidateError[]
      source: string
    }

export const loader: LoaderFunction = async ({ request }) => {
  const pageId = 'index.md'
  const cacheParameter = new URL(request.url).searchParams.get('cache')

  if (cacheParameter === '0') {
    const cache = await getCache()
    await cache.del(`parseMarkdoc:${pageId}`)
    await cache.del(`transformMarkdoc:${pageId}`)
  }

  const content = await fetchContent({ pageId })
  if (content instanceof Error) {
    return {
      success: false,
      errors: [content],
      source: '',
    }
  }

  const source = content.responseText
  const sourceHash = content.responseHash

  const result = await transformMarkdoc({ source, pageId, sourceHash })
  if (result instanceof Error) {
    return {
      success: false,
      errors: [result],
      source: '',
    }
  }

  return json<LoaderData>(
    result.success
      ? result
      : {
          ...result,
          source,
        },
  )
}

export default function Route() {
  const loaderData = useLoaderData<LoaderData>()
  const { galleryClassName } = usePhotoSwipe()

  if (!loaderData.success) {
    const { errors, source } = loaderData
    return <MarkdocErrorList errors={errors} source={source} />
  }

  const { renderableTreeNode, references } = loaderData
  return (
    <Page
      isIndex
      content={renderableTreeNode}
      context={{ references }}
      className={galleryClassName}
    />
  )
}
