import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import type { RenderableTreeNode } from '@markdoc/markdoc'

import PhotoSwipeCSS from 'photoswipe/dist/photoswipe.css'

import { Page, PageCSS } from '~/components/page'
import { BitCSS } from '~/components/bit'

import { getMarkdocPage } from '~/lib/markdoc.server'
import { usePhotoSwipe } from '~/hooks/use-photo-swipe'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: PhotoSwipeCSS },
  { rel: 'stylesheet', href: PageCSS },
  { rel: 'stylesheet', href: BitCSS },
]

type LoaderData = {
  content: RenderableTreeNode
}

export const loader: LoaderFunction = async (props) => {
  const { params } = props
  const { page: pageId } = params
  invariant(typeof pageId === 'string', 'Must specify page')

  const url = new URL(props.request.url)
  const ignoreCache = url.searchParams.has('refresh')

  const { content } = await getMarkdocPage({
    pageId: `${pageId}.md`,
    ignoreCache,
  })

  return json<LoaderData>({ content })
}

export default function Route() {
  const { content } = useLoaderData<LoaderData>()

  const { galleryClassName } = usePhotoSwipe()

  return <Page content={content} className={galleryClassName} />
}
