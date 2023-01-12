import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PhotoSwipeCSS from 'photoswipe/dist/photoswipe.css'
import type { References, ReferencedImage } from '~/lib/antlers'
import { fetchContent, transformMarkdoc } from '~/lib/antlers.server'
import * as PhotoStream from '~/components/photostream'
import { usePhotoSwipe } from '~/hooks/use-photo-swipe'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: PhotoSwipeCSS },
  { rel: 'stylesheet', href: PhotoStream.PhotoStreamCSS },
]

type LoaderData = {
  images: ReferencedImage[]
}

const getAllImages = (references: References): ReferencedImage[] => {
  const fileImages = Object.values(references.files).flatMap((file) => {
    return getAllImages({
      files: {},
      images: file.summaryReferences.images,
    }).reverse()
  })
  return [...fileImages, ...Object.values(references.images).reverse()]
}

export const loader: LoaderFunction = async () => {
  const pageId = 'index.md'

  const content = await fetchContent({ pageId })
  if (content instanceof Error) {
    throw content
  }

  const source = content.responseText
  const sourceHash = content.responseHash

  const result = await transformMarkdoc({ source, pageId, sourceHash })
  if (result instanceof Error) {
    throw result
  }

  if (!result.success) {
    throw new Error('Could not transform result')
  }

  const images = getAllImages(result.references)

  return json<LoaderData>({ images })
}

export default function Route() {
  const { images } = useLoaderData<LoaderData>()
  const { galleryClassName } = usePhotoSwipe()

  return (
    <PhotoStream.Page images={images} galleryClassName={galleryClassName} />
  )
}
