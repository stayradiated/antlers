import React, { useContext } from 'react'
import invariant from 'tiny-invariant'
import type { LocationPartialProps } from '../../lib/antlers/markdoc/tags/index'
import { PageContext } from './context'
import { MapPointPartialTag } from './map-point-partial-tag'
import type { MapPointPartialProps } from './map-point-partial-tag'
import { TravelPartialTag } from './travel-partial-tag'
import type { TravelPartialProps } from './travel-partial-tag'
import { Map } from '~/components/map'
import type { Point, Line } from '~/components/map'
import { getMapFile, getLocationFile, getImage } from '~/lib/references'

const LocationPartialTag = (props: LocationPartialProps) => {
  const { file: locationFilepath, viewPort, children } = props

  const pageContext = useContext(PageContext)
  const { references } = pageContext

  const locationFile = getLocationFile(locationFilepath, references)

  let mapElement: React.ReactNode

  const countryMapFile = props.countryMapFile
    ? getMapFile(props.countryMapFile, references)
    : locationFile.frontmatter.countryMapFile
    ? getMapFile(
        locationFile.frontmatter.countryMapFile,
        locationFile.frontmatterReferences,
      )
    : undefined

  if (locationFile.frontmatter.coordinates && countryMapFile) {
    const image = getImage(
      countryMapFile.frontmatter.image,
      countryMapFile.frontmatterReferences,
    )

    const points: Point[] = [
      {
        label: locationFile.frontmatter.name,
        coordinates: locationFile.frontmatter.coordinates,
      },
    ]

    const lines: Line[] = []

    React.Children.map(children, (node) => {
      switch (node.type) {
        case MapPointPartialTag: {
          const { file: filepath, style } = node.props as MapPointPartialProps

          const file = references.files[filepath]
          invariant(file.frontmatter.type === 'location')
          invariant(file.frontmatter.coordinates)

          points.push({
            label: file.frontmatter.name,
            coordinates: file.frontmatter.coordinates,
            style,
          })
          break
        }

        case TravelPartialTag: {
          const { file: filepath, animated } = node.props as TravelPartialProps
          const file = references.files[filepath]
          invariant(file.frontmatter.type === 'travel')
          invariant(file.frontmatter.coordinates)

          lines.push({
            coordinates: file.frontmatter.coordinates,
            animated,
          })
          break
        }

        default: {
          break
        }
      }
    })

    mapElement = (
      <Map
        viewPort={viewPort}
        image={image}
        mapCoordinates={countryMapFile.frontmatter.coordinates}
        points={points}
        lines={lines}
      />
    )
  }

  return (
    <>
      <h3>
        <a href={locationFilepath}>
          {locationFile.frontmatter.name}, {locationFile.frontmatter.country}
        </a>
      </h3>
      {mapElement}
    </>
  )
}

export { LocationPartialTag }
