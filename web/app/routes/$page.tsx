import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'
import { useEffect, useMemo } from 'react'
import Markdown from 'markdown-to-jsx'
import invariant from 'tiny-invariant'

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeCSS from 'photoswipe/dist/photoswipe.css'

import {
  AirBnB,
  Extract,
  Tip,
  Place,
  Strava,
  Image,
  ImageRow,
  PageCSS,
} from '../components/page'

import { getPage } from '../lib/file.server'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: PhotoSwipeCSS,
  },
  {
    rel: 'stylesheet',
    href: PageCSS,
  },
]

type LoaderData = {
  markdown: string
}

export const loader: LoaderFunction = async (props) => {
  const { params } = props
  const { page: pageId } = params
  invariant(typeof pageId === 'string', 'Must specify page')

  const url = new URL(props.request.url)
  const ignoreCache = url.searchParams.has('refresh')

  const { markdown } = await getPage({ pageId, ignoreCache })

  return json<LoaderData>({
    markdown,
  })
}

export default function Route() {
  const { markdown } = useLoaderData<LoaderData>()

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#page',
      children: '.gallery-item',
      pswpModule: PhotoSwipe,
    })

    lightbox.init()
  })

  const options = useMemo(
    () => ({
      overrides: {
        tip: { component: Tip },
        place: { component: Place },
        airbnb: { component: AirBnB },
        extract: { component: Extract },
        strava: { component: Strava },
        img: { component: Image },
        row: { component: ImageRow },
      },
    }),
    [],
  )

  return (
    <main id="page">
      <Link to="/">« Home</Link>
      <Markdown options={options}>{markdown}</Markdown>
    </main>
  )
}
