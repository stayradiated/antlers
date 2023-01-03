import type { Schema } from '@markdoc/markdoc'
import { Tag } from '@markdoc/markdoc'

const paragraph: Schema = {
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)

    // Hack to make rendering block tags work correctly. They shouldn't be
    // wrapped in a p tag.
    if (
      children.length > 0 &&
      children.every((child) => {
        if (typeof child === 'string') {
          return child.trim().length === 0
        }

        if (child instanceof Tag) {
          return child.name === 'Image'
        }

        return false
      })
    ) {
      return children
    }

    return new Tag('p', attributes, children)
  },
}

export { paragraph }
