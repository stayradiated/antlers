import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import PhotoSwipe from 'photoswipe'
import PhotoSwipeCSS from 'photoswipe/dist/photoswipe.css'
import stylesheet from './styles.css'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: PhotoSwipeCSS,
  },
  {
    rel: 'stylesheet',
    href: stylesheet,
  },
]

type LoaderData = {
  index: Array<{
    filename: string
    width: number
    height: number
  }>
  album: string
}

export const loader: LoaderFunction = async () => {
  const album = 'pitelli'

  const response = await fetch(
    `https://cat.stayradiated.com/where-is-george-czabania/images/${album}/index.json`,
  )
  const index = await response.json()

  return json<LoaderData>({
    index,
    album,
  })
}

export default function Index() {
  const { index, album } = useLoaderData<LoaderData>()

  console.log(index)

  useEffect(() => {
    const options = {
      gallery: '#gallery',
      children: 'a',
      pswpModule: PhotoSwipe,
    }
    const lightbox = new PhotoSwipeLightbox(options)
    lightbox.init()
  }, [])

  return (
    <main>
      <h1>Pitelli, Italia</h1>
      <h2>+ San Terenzo, Lerici, Torello</h2>
      <div id="gallery">
        {index.map((entry, index) => (
          <a
            key={index}
            href={`https://cat.stayradiated.com/where-is-george-czabania/images/${album}/${entry.filename}.2000.webp`}
            data-pswp-width={entry.width}
            data-pswp-height={entry.height}
            target="_blank"
          >
            <img
              style={{ width: '100%' }}
              src={`https://cat.stayradiated.com/where-is-george-czabania/images/${album}/${entry.filename}.1000.webp`}
              alt={entry.filename}
            />
          </a>
        ))}
      </div>
    </main>
  )
}
