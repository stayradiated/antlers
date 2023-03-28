import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { RenderableTreeNode, ValidateError } from '@markdoc/markdoc'
import invariant from 'tiny-invariant'

import PhotoSwipeCSS from 'photoswipe/dist/photoswipe.css'
import { MarkdocErrorList, MarkdocCSS } from '~/components/markdoc'

import { Page, stylesheet as PageCSS } from '~/components/page'
import { stylesheet as AccomodationCSS } from '~/components/accomodation'
import { stylesheet as DefinitionCSS } from '~/components/definition'
import { stylesheet as ImageCSS } from '~/components/image'
import { stylesheet as LocationCSS } from '~/components/location'
import { stylesheet as MapCSS } from '~/components/map'
import { stylesheet as SojournCSS } from '~/components/sojourn'
import { stylesheet as StoryCSS } from '~/components/story'
import { stylesheet as VideoCSS } from '~/components/video'
import { stylesheet as PlaceCSS } from '~/components/place'
import { BitCSS, ErrorMessage } from '~/components/bit'
import { errorToObject } from '~/lib/error'

import { fetchContent, transformMarkdoc } from '~/lib/antlers.server'
import type { References } from '~/lib/antlers.server'
import { BASE_PATH } from '~/lib/config.server'

import { usePhotoSwipe } from '~/hooks/use-photo-swipe'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: AccomodationCSS },
  { rel: 'stylesheet', href: BitCSS },
  { rel: 'stylesheet', href: ImageCSS },
  { rel: 'stylesheet', href: LocationCSS },
  { rel: 'stylesheet', href: MapCSS },
  { rel: 'stylesheet', href: MarkdocCSS },
  { rel: 'stylesheet', href: PageCSS },
  { rel: 'stylesheet', href: PhotoSwipeCSS },
  { rel: 'stylesheet', href: PlaceCSS },
  { rel: 'stylesheet', href: SojournCSS },
  { rel: 'stylesheet', href: StoryCSS },
  { rel: 'stylesheet', href: VideoCSS },
  { rel: 'stylesheet', href: DefinitionCSS },
]

type LoaderData =
  | {
      state: 'success'
      renderableTreeNode: RenderableTreeNode
      references: References
      isIndex: boolean
      basePath: string
    }
  | {
      state: 'validation-error'
      errors: ValidateError[]
      source: string
    }
  | {
      state: 'error'
      error: string
    }

export const loader: LoaderFunction = async (props) => {
  const { params } = props
  const pageId = params['*'] ?? 'index.md'

  invariant(typeof pageId === 'string', 'Must specify page')
  invariant(typeof pageId.endsWith('.md'), 'Must be markdown file')

  const content = await fetchContent({ pageId })
  if (content instanceof Error) {
    return json<LoaderData>({
      state: 'error',
      error: JSON.stringify(errorToObject(content), null, 2),
    })
  }

  const source = content.responseText
  const sourceHash = content.responseHash

  const result = await transformMarkdoc({ source, pageId, sourceHash })
  if (result instanceof Error) {
    return json<LoaderData>({
      state: 'error',
      error: JSON.stringify(errorToObject(result), null, 2),
    })
  }

  return json<LoaderData>(
    result.success
      ? {
          state: 'success',
          renderableTreeNode: result.renderableTreeNode,
          references: result.references,
          isIndex: pageId === 'index.md',
          basePath: BASE_PATH,
        }
      : { state: 'validation-error', errors: result.errors, source },
  )
}

export default function Route() {
  const loaderData = useLoaderData<LoaderData>()
  const { galleryClassName } = usePhotoSwipe()

  if (!loaderData) {
    return <ErrorMessage message="No loader data!" />
  }

  if (loaderData.state === 'error') {
    return <ErrorMessage message={loaderData.error} />
  }

  if (loaderData.state === 'validation-error') {
    const { errors, source } = loaderData
    return <MarkdocErrorList errors={errors} source={source} />
  }

  const { renderableTreeNode, references, isIndex, basePath } = loaderData
  return (
    <Page
      isIndex={isIndex}
      content={renderableTreeNode}
      context={{ references, basePath }}
      className={galleryClassName}
    />
  )
}
