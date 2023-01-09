import { Link } from '@remix-run/react'
import Markdoc from '@markdoc/markdoc'
import React from 'react'
import type { RenderableTreeNode } from '@markdoc/markdoc'
import { PageContext } from './context'
import type { PageContextValue } from './context'

import { Accomodation } from './accomodation'
import { Extract } from './extract'
import { ImageTag } from './image-tag'
import { LocationPartialTag } from './location-partial-tag'
import { LocationTag } from './location-tag'
import { MapLegacy } from './map-legacy'
import { MapPartialTag } from './map-partial-tag'
import { MapPointPartialTag } from './map-point-partial-tag'
import { MapPointTag } from './map-point-tag'
import { Place } from './place'
import { Row } from './row'
import { SojournPartialTag } from './sojourn-partial-tag'
import { SojournTag } from './sojourn-tag'
import { Strava } from './strava'
import { Tip } from './tip'
import { Travel } from './travel'
import { TravelPartialTag } from './travel-partial-tag'

import { createCX } from '~/lib/class-name'

const cx = createCX('page', 'Page')

type PageProps = {
  className?: string
  content: RenderableTreeNode
  isIndex?: boolean
  context: PageContextValue
}

const Page = (props: PageProps) => {
  const { content, className, isIndex, context } = props

  return (
    <PageContext.Provider value={context}>
      <main className={cx('container', className)}>
        {!isIndex && <Link to="/">« Home</Link>}

        {Markdoc.renderers.react(content, React, {
          components: {
            Accomodation,
            Extract,
            Image: ImageTag,
            Location: LocationTag,
            LocationPartial: LocationPartialTag,
            MapLegacy,
            MapPartial: MapPartialTag,
            MapPoint: MapPointTag,
            MapPointPartial: MapPointPartialTag,
            Place,
            Row,
            Sojourn: SojournTag,
            SojournPartial: SojournPartialTag,
            Strava,
            Tip,
            Travel,
            TravelPartial: TravelPartialTag,
          },
        })}
      </main>
    </PageContext.Provider>
  )
}

export { Page }
