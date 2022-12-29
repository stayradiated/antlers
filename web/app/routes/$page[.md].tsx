import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import type { RenderableTreeNode, ValidateError } from '@markdoc/markdoc'

import PhotoSwipeCSS from 'photoswipe/dist/photoswipe.css'

import { CONTENT_HOST } from '~/lib/config.server'

import { Page, PageCSS } from '~/components/page'
import { MarkdocErrorList, MarkdocCSS } from '~/components/markdoc'
import { BitCSS } from '~/components/bit'

import { fetchContent, parseMarkdoc } from '~/lib/antlers.server'
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
    }
  | {
      success: false
      errors: ValidateError[]
      source: string
    }

export const loader: LoaderFunction = async (props) => {
  const { params } = props
  const { page: pageId } = params
  invariant(typeof pageId === 'string', 'Must specify page')

  const source = await fetchContent({
    contentHost: CONTENT_HOST,
    pageId: `${pageId}.md`,
  })

  const result = await parseMarkdoc({ source })
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

  const { value } = loaderData
  return <Page content={value} className={galleryClassName} />
}
