import type { ReactElement } from 'react'
import type { Schema } from '@markdoc/markdoc'
import type { MapPointProps } from './map-point'
import type { MapPointPartialProps } from './map-point-partial'

type MapPartialProps = {
  file: string
  children: Array<ReactElement<MapPointProps | MapPointPartialProps>>
}

const validChildrenTags = ['travelPartial', 'mapPoint', 'mapPointPartial']

const mapPartial: Schema = {
  render: 'MapPartial',
  children: ['tag'],
  attributes: {
    file: { type: String, required: true },
  },
  validate(node) {
    const hasValidChildren = node.children.every((child) => {
      return (
        typeof child.tag === 'string' && validChildrenTags.includes(child.tag)
      )
    })
    if (!hasValidChildren) {
      return [
        {
          id: 'map-partial-invalid-children',
          level: 'error',
          message: `MapPartial can only contain ${validChildrenTags.join(
            ', ',
          )} tags`,
        },
      ]
    }

    return []
  },
}

export { mapPartial }
export type { MapPartialProps }
