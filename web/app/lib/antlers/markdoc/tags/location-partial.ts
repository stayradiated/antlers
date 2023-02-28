import type { ReactElement } from 'react'
import type { Schema } from '@markdoc/markdoc'
import { ViewPortAttribute } from '../attributes/index'
import type { ViewPort } from '../attributes/index'
import type { TravelPartialProps } from './travel-partial'
import type { MapPointProps } from './map-point'
import type { MapPointPartialProps } from './map-point-partial'

type LocationPartialProps = {
  file: string
  children: Array<
    ReactElement<TravelPartialProps | MapPointProps | MapPointPartialProps>
  >
  viewPort?: ViewPort
  countryMapFile?: string
  showMap?: boolean
}

const validChildrenTags = ['travelPartial', 'mapPoint', 'mapPointPartial']

const locationPartial: Schema = {
  render: 'LocationPartial',
  children: ['tag'],
  attributes: {
    file: { type: String, required: true },
    viewPort: { type: ViewPortAttribute, required: false },
    countryMapFile: { type: String, required: false },
    showMap: { type: Boolean, required: false, default: true }
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
          id: 'location-partial-invalid-children',
          level: 'error',
          message: `LocationPartial can only contain ${validChildrenTags.join(
            ', ',
          )} tags`,
        },
      ]
    }

    return []
  },
}

export { locationPartial }
export type { LocationPartialProps }
