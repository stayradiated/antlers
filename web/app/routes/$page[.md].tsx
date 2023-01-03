import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import type { RenderableTreeNode, ValidateError } from '@markdoc/markdoc'

import PhotoSwipeCSS from 'photoswipe/dist/photoswipe.css'

import { Page, PageCSS } from '~/components/page'
import { MarkdocErrorList, MarkdocCSS } from '~/components/markdoc'
import { BitCSS } from '~/components/bit'

import {
  fetchContent,
  transformMarkdoc,
  type References,
  getCache,
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
      value: RenderableTreeNode
      references: References
    }
  | {
      success: false
      errors: ValidateError[]
      source: string
    }

export const loader: LoaderFunction = async (props) => {
  const { params, request } = props
  const { page } = params
  invariant(typeof page === 'string', 'Must specify page')

  const pageId = `${page}.md`

  const cacheParameter = new URL(request.url).searchParams.get('cache')

  if (cacheParameter === '0') {
    const cache = await getCache()
    await cache.del(`parseMarkdoc:${pageId}`)
    await cache.del(`transformMarkdoc:${pageId}`)
  }

  const content = await fetchContent({ pageId })
  const source = content.responseText
  const sourceHash = content.responseHash

  const result = await transformMarkdoc({ pageId, source, sourceHash })
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

  const { value, references } = loaderData
  return (
    <Page
      content={value}
      context={{ references }}
      className={galleryClassName}
    />
  )
}
