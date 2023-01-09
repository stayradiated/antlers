import type { ReactElement } from 'react'
import type { Schema } from '@markdoc/markdoc'
import type { TravelPartialProps } from './travel-partial'
import type { MapPointProps } from './map-point'

type LocationPartialProps = {
  file: string
  children: Array<ReactElement<TravelPartialProps | MapPointProps>>
}

const validChildrenTags = ['travelPartial', 'mapPointPartial']

const locationPartial: Schema = {
  render: 'LocationPartial',
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
