import { useContext } from 'react'
import { PageContext } from '~/components/page/context'
import * as Sojourn from '~/components/sojourn'
import type { SojournPartialProps } from '~/lib/antlers/markdoc/tags/index'
import { ErrorMessage } from '~/components/bit'
import { getFile, getImage } from '~/lib/references'
import { BASE_PATH } from '~/lib/config.server'

const SojournPartialTag = (props: SojournPartialProps) => {
  const { file: sojournFilename, link } = props
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
  let region: string | undefined
  let country: string

  if (typeof locationFilename === 'string') {
    const locationFile = getFile(
      'location',
      locationFilename,
      sojournFile.frontmatterReferences,
    )
    locationName = locationFile.frontmatter.name
    region = locationFile.frontmatter.region
    country = locationFile.frontmatter.country
  } else {
    const {
      location,
      country: fCountry,
      region: fRegion,
    } = sojournFile.frontmatter
    if (typeof location !== 'string') {
      return <ErrorMessage message="SojournPartialTag: Unknown Location" />
    }

    if (typeof fCountry !== 'string') {
      return <ErrorMessage message="SojournPartialTag: Unknown Country" />
    }

    locationName = location
    region = fRegion
    country = fCountry
  }

  return (
    <Sojourn.Card
      arriveAt={arriveAt}
      departAt={departAt}
      location={locationName}
      region={region}
      country={country}
      href={link ? `${BASE_PATH}${sojournFilename}` : undefined}
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
