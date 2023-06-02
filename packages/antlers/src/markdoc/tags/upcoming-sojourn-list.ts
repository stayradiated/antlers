import type { Schema } from '@markdoc/markdoc'
import { assertValidChildren } from '../utils.js'

const upcomingSojournList: Schema = {
  render: 'UpcomingSojournList',
  children: ['tag'],
  attributes: {},
  validate(node) {
    return assertValidChildren(node, ['sojournPartial'])
  },
}

export { upcomingSojournList }
