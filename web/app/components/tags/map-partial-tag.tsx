import React, { useContext } from 'react'
import invariant from 'tiny-invariant'
import { MapPointPartialTag } from './map-point-partial-tag'
import { MapPointTag } from './map-point-tag'
import { TravelPartialTag } from './travel-partial-tag'
import { PageContext } from '~/components/page/context'
import { Map } from '~/components/map'
import type { Point, Line } from '~/components/map'
import type {
  MapPointPartialProps,
  MapPointProps,
  MapPartialProps,
  TravelPartialProps,
} from '~/lib/antlers/markdoc/tags/index'
import { getFile, getImage } from '~/lib/references'

const MapPartialTag = (props: MapPartialProps) => {
  const { file: mapFilename, children, viewPort } = props

  const pageContext = useContext(PageContext)
  const { references } = pageContext

  const map = getFile('map', mapFilename, references)
  const image = getImage(map.frontmatter.image, map.frontmatterReferences)
  const lines: Line[] = []

  const points = React.Children.map(children ?? [], (node): Point | void => {
    switch (node.type) {
      case MapPointPartialTag: {
        const { file: locationFilename, style } =
          node.props as MapPointPartialProps
        const locationFile = getFile('location', locationFilename, references)
        const { name, coordinates } = locationFile.frontmatter
        if (!coordinates) {
          return undefined
        }

        return { coordinates, label: name, style, href: locationFilename }
      }

      case TravelPartialTag: {
        const { file: filepath, animated, strokeWidth, strokeLength } = node.props as TravelPartialProps
        const file = references.files[filepath]
        invariant(file.frontmatter.type === 'travel')
        invariant(file.frontmatter.coordinates)

        lines.push({
          coordinates: file.frontmatter.coordinates,
          animated,
          strokeWidth,
          strokeLength
        })
        break
      }

      case MapPointTag: {
        return node.props as MapPointProps
      }

      default: {
        break
      }
    }
  }).filter((item): item is Point => {
    return typeof item !== 'undefined'
  })

  return (
    <Map
      viewPort={viewPort}
      image={image}
      mapCoordinates={map.frontmatter.coordinates}
      points={points}
      lines={lines}
    />
  )
}

export { MapPartialTag }
