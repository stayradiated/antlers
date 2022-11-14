import { Link } from '@remix-run/react'
import Markdoc from '@markdoc/markdoc'
import React from 'react'
import type { RenderableTreeNode } from '@markdoc/markdoc'

import { Location } from './location'
import { Accomodation } from './accomodation'
import { Photo } from './photo'
import { Row } from './row'
import { Map } from './map'
import { Strava } from './strava'
import { Place } from './place'
import { Tip } from './tip'
import { Extract } from './extract'
import { createCX } from '~/lib/class-name'

const cx = createCX('page', 'Page')

type PageProps = {
  className?: string
  content: RenderableTreeNode
  isIndex?: boolean
}

const Page = (props: PageProps) => {
  const { content, className, isIndex } = props

  return (
    <main className={cx('container', className)}>
      {!isIndex && <Link to="/">« Home</Link>}

      {Markdoc.renderers.react(content, React, {
        components: {
          Accomodation,
          Photo,
          Row,
          Map,
          Strava,
          Place,
          Tip,
          Extract,
          Location,
        },
      })}
    </main>
  )
}

export { Page }
