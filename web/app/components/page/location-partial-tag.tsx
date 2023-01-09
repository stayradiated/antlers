import React, { useContext } from 'react'
import invariant from 'tiny-invariant'
import type { LocationPartialProps } from '../../lib/antlers/markdoc/tags/index'
import { PageContext } from './context'
import { MapPointPartialTag } from './map-point-partial-tag'
import type { MapPointPartialProps } from './map-point-partial-tag'
import { TravelPartialTag } from './travel-partial-tag'
import type { TravelPartialProps } from './travel-partial-tag'
import { ErrorMessage } from '~/components/bit'
import { Map, type Point, type Line } from '~/components/map'

const LocationPartialTag = (props: LocationPartialProps) => {
  const { file: filepath, children } = props

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

    const points: Point[] = [
      {
        label: file.frontmatter.name,
        coordinates: file.frontmatter.coordinates,
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
          const { file: filepath } = node.props
          const file = references.files[filepath]
          invariant(file.frontmatter.type === 'travel')
          invariant(file.frontmatter.coordinates)

          lines.push({
            coordinates: file.frontmatter.coordinates,
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
        image={image}
        mapCoordinates={map.frontmatter.coordinates}
        points={points}
        lines={lines}
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
