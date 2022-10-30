import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, Link } from '@remix-run/react'
import { useEffect, useMemo } from 'react'
import Markdown from 'markdown-to-jsx'
import invariant from 'tiny-invariant'

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeCSS from 'photoswipe/dist/photoswipe.css'
import { transformMarkdown, updateCache } from '../lib/preprocess.server'

import { config } from '../lib/config.server'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: PhotoSwipeCSS,
  },
]

type LoaderData = {
  markdown: string
}

export const loader: LoaderFunction = async (props) => {
  const { params } = props
  const { page } = params
  invariant(typeof page === 'string', 'Must specify page')

  const response = await fetch(
    `https://cat.stayradiated.com/where-is-george-czabania/${page}`,
  )
  const { markdown, cacheUrlMap } = await transformMarkdown(
    config.CACHE_DIR_PATH,
    await response.text(),
  )

  // Run in background
  void updateCache({ cacheUrlMap, cacheDirPath: config.CACHE_DIR_PATH }).then(
    () => {
      console.log('Finished updating cache')
    },
    (error: unknown) => {
      console.error(error)
    },
  )

  return json<LoaderData>({
    markdown,
  })
}

type TipProps = {
  title: string
  children: React.ReactNode
}

const Tip = (props: TipProps) => {
  const { title, children } = props
  return (
    <blockquote>
      <h3>{title}</h3>
      {children}
    </blockquote>
  )
}

type PlaceProps = {
  title: string
  category: string
  href: string
  children: React.ReactNode
}
const Place = (props: PlaceProps) => {
  const { title, category, href, children } = props
  return (
    <blockquote>
      <a href={href} target="_blank" rel="noopener">
        <h3>{title}</h3>
      </a>
      <em>{category}</em>
      {children}
    </blockquote>
  )
}

type AirBnBProps = {
  title: string
  image: string
  review: string
  reviewCount: string
  href: string
}

const AirBnB = (props: AirBnBProps) => {
  const { title, image, review, reviewCount, href } = props
  return (
    <blockquote>
      <img src={image} />
      <h3>{title}</h3>
      <p>
        ★ {review} • {reviewCount} reviews
      </p>
      <a href={href} target="_blank" rel="noopener">
        View on AirBnB
      </a>
    </blockquote>
  )
}

type ExtractProps = {
  href: string
  title: string
  children: React.ReactNode
}

const Extract = (props: ExtractProps) => {
  const { title, href, children } = props
  return (
    <blockquote>
      <pre>{children}</pre>
      <p>
        From{' '}
        <a href={href} target="_blank" rel="noopener">
          {title}
        </a>
      </p>
    </blockquote>
  )
}

type StravaProps = {
  embedUrl: string
}

const Strava = (props: StravaProps) => {
  const { embedUrl } = props

  return (
    <iframe
      height="405"
      width="590"
      frameBorder="0"
      scrolling="no"
      src={embedUrl}
    />
  )
}

type ImageProps = {
  alt?: string
  title?: string
  src: string
}

const Image = (props: ImageProps) => {
  const { alt, title, src } = props

  if (src.startsWith('cache:')) {
    const [_prefix, id, widthString, heightString] = src.split(':')
    const width = parseInt(widthString, 10)
    const height = parseInt(heightString, 10)

    return (
      <>
        <a
          className="gallery-item"
          href={`https://cat.stayradiated.com/where-is-george-czabania/image/${id}/2560.jpg`}
          data-pswp-width={width}
          data-pswp-height={height}
          target="_blank"
        >
          <img
            style={{ width: '100%' }}
            width={width}
            height={height}
            src={`https://cat.stayradiated.com/where-is-george-czabania/image/${id}/720.jpg`}
          />
        </a>
        {alt && (
          <div style={{ textAlign: 'center', paddingBottom: '1em' }}>{alt}</div>
        )}
      </>
    )
  }

  return <img alt={alt} title={title} src={src} />
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
