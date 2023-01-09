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

  const { frontmatter, frontmatterReferences, summary } = page
  if (frontmatter.type !== 'sojourn') {
    return (
      <ErrorMessage message="SojournPartialTag: Referenced file must be type 'sojourn'" />
    )
  }

  const { arriveAt, departAt, locationFile, image: imagePath } = frontmatter
  const image = imagePath ? frontmatterReferences.images[imagePath] : undefined

  if (typeof arriveAt !== 'string') {
    return <ErrorMessage message="SojournPartialTag: Unknown Arrival Date" />
  }

  let locationName: string
  let countryName: string

  if (typeof locationFile === 'string') {
    const location = frontmatterReferences.files[locationFile]
    if (!location) {
      const message = `SojournPartialTag: Could not load reference ${locationFile}`
      return <ErrorMessage message={message} />
    }

    if (location.frontmatter.type !== 'location') {
      return (
        <ErrorMessage message="SojournPartialTag: Referenced file must be type 'location'" />
      )
    }

    locationName = location.frontmatter.name
    countryName = `${location.frontmatter.region}, ${location.frontmatter.country}`
  } else {
    const { location, country } = frontmatter
    if (typeof location !== 'string') {
      return <ErrorMessage message="SojournPartialTag: Unknown Location" />
    }

    if (typeof country !== 'string') {
      return <ErrorMessage message="SojournPartialTag: Unknown Country" />
    }

    locationName = location
    countryName = country
  }

  return (
    <Sojourn
      arriveAt={arriveAt}
      departAt={departAt}
      location={locationName}
      country={countryName}
      href={file}
      image={image}
      summary={summary}
    />
  )
}

export { SojournPartialTag }
