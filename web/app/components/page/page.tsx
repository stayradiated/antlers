import { Link } from '@remix-run/react'
import Markdoc from '@markdoc/markdoc'
import React from 'react'
import type { RenderableTreeNode } from '@markdoc/markdoc'
import { PageContext } from './context'
import type { PageContextValue } from './context'

import { Accomodation } from './accomodation'
import { Extract } from './extract'
import { LocationTag } from './location-tag'
import { Map } from './map'
import { ImageTag } from './image-tag'
import { Place } from './place'
import { Row } from './row'
import { SojournTag } from './sojourn-tag'
import { SojournPartialTag } from './sojourn-partial-tag'
import { Strava } from './strava'
import { Tip } from './tip'
import { Travel } from './travel'

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
            Location: LocationTag,
            Map,
            Image: ImageTag,
            Place,
            Row,
            Sojourn: SojournTag,
            SojournPartial: SojournPartialTag,
            Strava,
            Tip,
            Travel,
          },
        })}
      </main>
    </PageContext.Provider>
  )
}

export { Page }
