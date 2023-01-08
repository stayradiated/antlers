import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { RenderableTreeNode, ValidateError } from '@markdoc/markdoc'
import invariant from 'tiny-invariant'

import PhotoSwipeCSS from 'photoswipe/dist/photoswipe.css'
import { MarkdocErrorList, MarkdocCSS } from '~/components/markdoc'

import { Page, PageCSS } from '~/components/page'
import { MapCSS } from '~/components/map'
import { BitCSS, ErrorMessage } from '~/components/bit'

import {
  fetchContent,
  transformMarkdoc,
  type References,
} from '~/lib/antlers.server'
import { usePhotoSwipe } from '~/hooks/use-photo-swipe'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: PhotoSwipeCSS },
  { rel: 'stylesheet', href: PageCSS },
  { rel: 'stylesheet', href: MapCSS },
  { rel: 'stylesheet', href: BitCSS },
  { rel: 'stylesheet', href: MarkdocCSS },
]

type LoaderData =
  | {
      state: 'success'
      renderableTreeNode: RenderableTreeNode
      references: References
    }
  | {
      state: 'validation-error'
      errors: ValidateError[]
      source: string
    }
  | {
      state: 'error'
      error: Error
    }

export const loader: LoaderFunction = async (props) => {
  const { params } = props
  const pageId = params['*']

  invariant(typeof pageId === 'string', 'Must specify page')
  invariant(typeof pageId.endsWith('.md'), 'Must be markdown file')

  const content = await fetchContent({ pageId })
  if (content instanceof Error) {
    return json<LoaderData>({ state: 'error', error: content })
  }

  const source = content.responseText
  const sourceHash = content.responseHash

  const result = await transformMarkdoc({ source, pageId, sourceHash })
  if (result instanceof Error) {
    return json<LoaderData>({ state: 'error', error: result })
  }

  return json<LoaderData>(
    result.success
      ? {
          state: 'success',
          renderableTreeNode: result.renderableTreeNode,
          references: result.references,
        }
      : { state: 'validation-error', errors: result.errors, source },
  )
}

export default function Route() {
  const loaderData = useLoaderData<LoaderData>()
  const { galleryClassName } = usePhotoSwipe()

  if (loaderData.state === 'error') {
    const message = `Error: ${JSON.stringify(loaderData, null, 2)}`
    return <ErrorMessage message={message} />
  }

  if (loaderData.state === 'validation-error') {
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
