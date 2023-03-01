import type { ReactElement } from 'react'
import type { Schema } from '@markdoc/markdoc'
import { assertValidChildren } from '../utils'
import type { SojournPartialProps } from './sojourn-partial'

type UpcomingSojournListTagProps = {
  children: Array<ReactElement<SojournPartialProps>>
}

const upcomingSojournList: Schema = {
  render: 'UpcomingSojournList',
  children: ['tag'],
  attributes: {},
  validate(node) {
    return assertValidChildren(node, ['sojournPartial'])
  },
}

export { upcomingSojournList }
export type { UpcomingSojournListTagProps }
