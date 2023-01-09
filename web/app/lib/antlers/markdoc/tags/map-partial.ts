import type { ReactElement } from 'react'
import type { Schema } from '@markdoc/markdoc'
import type { MapPointProps } from './map-point'

type MapPartialProps = {
  file: string
  children: Array<ReactElement<MapPointProps>>
}

const mapPartial: Schema = {
  render: 'MapPartial',
  children: ['tag'],
  attributes: {
    file: { type: String, required: true },
  },
  validate(node) {
    const hasValidChildren = node.children.every((child) => {
      console.log(child)
      return child.tag === 'mapPoint'
    })
    if (!hasValidChildren) {
      return [
        {
          id: 'map-partial-invalid-children',
          level: 'error',
          message: 'MapPartial can only contain MapPoint tags',
        },
      ]
    }

    return []
  },
}

export { mapPartial }
export type { MapPartialProps }
