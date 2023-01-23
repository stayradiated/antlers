import { useContext } from 'react'
import { PageContext } from '~/components/page/context'
import * as Sojourn from '~/components/sojourn'
import { ErrorMessage } from '~/components/bit'
import type { SojournProps } from '~/lib/antlers/markdoc/tags/index'

const SojournTag = (props: SojournProps) => {
  const {
    arriveAt,
    departAt,
    location,
    country,
    href,
    image: imagePath,
  } = props

  const pageContext = useContext(PageContext)
  const { references } = pageContext

  const image = imagePath ? references.images[imagePath] : undefined
  if (imagePath && !image) {
    const message = `SojournTag: could not load image reference ${imagePath}`
    return <ErrorMessage message={message} />
  }

  if (typeof arriveAt !== 'string') {
    return <p>Unknown Arrival Date</p>
  }

  if (typeof location !== 'string') {
    return <p>Unknown Location</p>
  }

  if (typeof country !== 'string') {
    return <p>Unknown Country</p>
  }

  return (
    <Sojourn.Card
      arriveAt={arriveAt}
      departAt={departAt}
      location={location}
      country={country}
      href={href}
      image={image}
    />
  )
}

export { SojournTag }
