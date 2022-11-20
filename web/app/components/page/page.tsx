import { Link } from '@remix-run/react'
import Markdoc from '@markdoc/markdoc'
import React from 'react'
import type { RenderableTreeNode } from '@markdoc/markdoc'

import { Accomodation } from './accomodation'
import { Extract } from './extract'
import { Location } from './location'
import { LocationBullet } from './location-bullet'
import { Map } from './map'
import { Photo } from './photo'
import { Place } from './place'
import { Row } from './row'
import { Strava } from './strava'
import { Tip } from './tip'
import { Travel } from './travel'

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
          Extract,
          Location,
          LocationBullet,
          Map,
          Photo,
          Place,
          Row,
          Strava,
          Tip,
          Travel,
        },
      })}
    </main>
  )
}

export { Page }
