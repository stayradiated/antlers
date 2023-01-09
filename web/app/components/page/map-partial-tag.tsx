import React, { useContext } from 'react'
import { PageContext } from './context'
import { ErrorMessage } from '~/components/bit'
import { Map } from '~/components/map'
import type { MapPartialProps } from '~/lib/antlers/markdoc/tags/index'

const MapPartialTag = (props: MapPartialProps) => {
  const { file, children } = props

  const pageContext = useContext(PageContext)
  const { references } = pageContext

  const map = references.files[file]
  if (!map) {
    const message = `Map: Could not load reference ${file}`
    return <ErrorMessage message={message} />
  }

  if (map.frontmatter.type !== 'map') {
    const message = `Map: Expected map type, found ${String(
      map.frontmatter.type,
    )}`
    return <ErrorMessage message={message} />
  }

  const image = map.frontmatterReferences.images[map.frontmatter.image]
  if (!image) {
    const message = `Map: Could not resolve image`
    return <ErrorMessage message={message} />
  }

  const points = React.Children.map(children, (child) => {
    return child.props
  })

  return (
    <Map
      image={image}
      mapCoordinates={map.frontmatter.coordinates}
      points={points}
    />
  )
}

export { MapPartialTag }
