import { useContext } from 'react'
import { PageContext } from './context'
import { Sojourn } from './sojourn'
import type { SojournPartialProps } from '~/lib/antlers/markdoc/tags/index'
import { ErrorMessage } from '~/components/bit'

const SojournPartialTag = (props: SojournPartialProps) => {
  const { file } = props
  const pageContext = useContext(PageContext)
  const { references } = pageContext

  const page = references.files[file]
  if (!page) {
    const message = `SojournPartialTag: Could not load reference ${file}`
    return <ErrorMessage message={message} />
  }

  const { frontmatter, references: fileReferences } = page
  const {
    arriveAt,
    departAt,
    location,
    country,
    image: imagePath,
  } = frontmatter
  const image = imagePath ? fileReferences.images[imagePath] : undefined

  if (typeof arriveAt !== 'string') {
    return <ErrorMessage message="SojournPartialTag: Unknown Arrival Date" />
  }

  if (typeof location !== 'string') {
    return <ErrorMessage message="SojournPartialTag: Unknown Location" />
  }

  if (typeof country !== 'string') {
    return <ErrorMessage message="SojournPartialTag: Unknown Country" />
  }

  return (
    <Sojourn
      arriveAt={arriveAt}
      departAt={departAt}
      location={location}
      country={country}
      href={file}
      image={image}
    />
  )
}

export { SojournPartialTag }
