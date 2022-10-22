import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useMemo } from 'react'
import Markdown from 'markdown-to-jsx'
import invariant from 'tiny-invariant'

type LoaderData = {
  markdown: string
}

export const loader: LoaderFunction = async (props) => {
  const { params } = props
  const { page } = params
  invariant(typeof page === 'string', 'Must specify page')

  const response = await fetch(`https://cat.stayradiated.com/where-is-george-czabania/${page}`)
  const markdown = await response.text()

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
      <a href={href} target="_blank" ref="noopener">
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
      allowTransparency
      scrolling="no"
      src={embedUrl}
    />
  )
}

type ImageProps = {
  alt: string
  title?: string
  src: string
}

const Image = (props: ImageProps) => {
  const { alt, title, src } = props

  return <img alt={alt} title={title} src={src} />
}

export default function Index() {
  const { markdown } = useLoaderData<LoaderData>()

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
    <main>
      <Markdown options={options}>{markdown}</Markdown>
    </main>
  )
}
