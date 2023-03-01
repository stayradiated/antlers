import type { ReactElement } from 'react'
import type { Schema } from '@markdoc/markdoc'
import type { ViewPort } from '../attributes/index'
import { ViewPortAttribute } from '../attributes/index'
import { assertValidChildren } from '../utils'
import type { MapPointProps } from './map-point'
import type { MapPointPartialProps } from './map-point-partial'

type MapPartialProps = {
  file: string
  children: Array<ReactElement<MapPointProps | MapPointPartialProps>>
  viewPort?: ViewPort
}

const mapPartial: Schema = {
  render: 'MapPartial',
  children: ['tag'],
  attributes: {
    file: { type: String, required: true },
    viewPort: { type: ViewPortAttribute, required: false },
  },
  validate(node) {
    return assertValidChildren(node, [
      'travelPartial',
      'mapPoint',
      'mapPointPartial',
    ])
  },
}

export { mapPartial }
export type { MapPartialProps }
