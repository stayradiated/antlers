import { Link } from '@remix-run/react'
import Markdoc from '@markdoc/markdoc'
import React from 'react'
import type { RenderableTreeNode } from '@markdoc/markdoc'
import { PageContext } from './context'
import type { PageContextValue } from './context'

import { components } from '~/components/tags'

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

        {isIndex && (
          <>
            <Link to="/photostream">Photostream</Link> •{' '}
            <Link to="/location/index.md">Locations</Link>
          </>
        )}

        {Markdoc.renderers.react(content, React, { components })}
      </main>
    </PageContext.Provider>
  )
}

export { Page }
