import React, { useContext } from 'react'
import { MapPointPartialTag } from './map-point-partial-tag'
import { MapPointTag } from './map-point-tag'
import { PageContext } from '~/components/page/context'
import { Map } from '~/components/map'
import type { Point } from '~/components/map'
import type {
  MapPointPartialProps,
  MapPointProps,
  MapPartialProps,
} from '~/lib/antlers/markdoc/tags/index'
import { getFile, getImage } from '~/lib/references'

const MapPartialTag = (props: MapPartialProps) => {
  const { file: mapFilename, children } = props

  const pageContext = useContext(PageContext)
  const { references } = pageContext

  const map = getFile('map', mapFilename, references)
  const image = getImage(map.frontmatter.image, map.frontmatterReferences)

  const points = React.Children.map(children ?? [], (child): Point | void => {
    if (child.type === MapPointPartialTag) {
      const { file: locationFilename, style } =
        child.props as MapPointPartialProps
      const locationFile = getFile('location', locationFilename, references)
      const { name, coordinates } = locationFile.frontmatter
      if (!coordinates) {
        return undefined
      }

      return { coordinates, label: name, style, href: locationFilename }
    }

    if (child.type === MapPointTag) {
      return child.props as MapPointProps
    }
  }).filter((item): item is Point => {
    return typeof item !== 'undefined'
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
