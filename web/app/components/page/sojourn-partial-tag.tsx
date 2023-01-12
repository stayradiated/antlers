import { useContext } from 'react'
import { PageContext } from './context'
import * as Sojourn from '~/components/sojourn'
import type { SojournPartialProps } from '~/lib/antlers/markdoc/tags/index'
import { ErrorMessage } from '~/components/bit'
import { getFile, getImage } from '~/lib/references'

const SojournPartialTag = (props: SojournPartialProps) => {
  const { file: sojournFilename } = props
  const pageContext = useContext(PageContext)
  const { references } = pageContext

  const sojournFile = getFile('sojourn', sojournFilename, references)
  const {
    arriveAt,
    departAt,
    locationFile: locationFilename,
    image: imageKey,
  } = sojournFile.frontmatter

  const image = imageKey
    ? getImage(imageKey, sojournFile.frontmatterReferences)
    : undefined

  let locationName: string
  let countryName: string

  if (typeof locationFilename === 'string') {
    const locationFile = getFile(
      'location',
      locationFilename,
      sojournFile.frontmatterReferences,
    )
    locationName = locationFile.frontmatter.name
    countryName = `${locationFile.frontmatter.region}, ${locationFile.frontmatter.country}`
  } else {
    const { location, country } = sojournFile.frontmatter
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
    <Sojourn.Card
      arriveAt={arriveAt}
      departAt={departAt}
      location={locationName}
      country={countryName}
      href={sojournFilename}
      image={image}
      summary={{
        ...sojournFile.summary,
        images: sojournFile.summary.images.map((imageKey) =>
          getImage(imageKey, sojournFile.summaryReferences),
        ),
      }}
    />
  )
}

export { SojournPartialTag }
