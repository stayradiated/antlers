import { useContext } from 'react'
import type { LocationPartialProps } from '../../lib/antlers/markdoc/tags/index'
import { PageContext } from './context'
import { ErrorMessage } from '~/components/bit'
import { Map } from '~/components/map'

const LocationPartialTag = (props: LocationPartialProps) => {
  const { file: filepath } = props

  const pageContext = useContext(PageContext)
  const { references } = pageContext

  const file = references.files[filepath]
  if (!file) {
    const message = `LocationPartialTag: Could not load reference ${file}`
    return <ErrorMessage message={message} />
  }

  if (file.frontmatter.type !== 'location') {
    const message = `LocationPartialTag: Expected location type, found ${String(
      file.frontmatter.type,
    )}`
    return <ErrorMessage message={message} />
  }

  let mapElement: React.ReactNode
  const { countryMapFile } = file.frontmatter
  if (file.frontmatter.coordinates && countryMapFile) {
    const map = file.frontmatterReferences.files[countryMapFile]
    if (!map) {
      const message = `LocationPartialTag: Could not load countryMapFile reference ${countryMapFile}`
      return <ErrorMessage message={message} />
    }

    if (map.frontmatter.type !== 'map') {
      const message = `LocationPartialTag: Expected map type, found ${String(
        map.frontmatter.type,
      )}`
      return <ErrorMessage message={message} />
    }

    const image = map.frontmatterReferences.images[map.frontmatter.image]
    if (!image) {
      const message = `Map: Could not resolve image`
      return <ErrorMessage message={message} />
    }

    mapElement = (
      <Map
        image={image}
        mapCoordinates={map.frontmatter.coordinates}
        points={[
          {
            label: file.frontmatter.name,
            coordinates: file.frontmatter.coordinates,
          },
        ]}
      />
    )
  }

  return (
    <>
      <h3>
        <a href={filepath}>
          {file.frontmatter.name}, {file.frontmatter.country}
        </a>
      </h3>
      {mapElement}
    </>
  )
}

export { LocationPartialTag }
