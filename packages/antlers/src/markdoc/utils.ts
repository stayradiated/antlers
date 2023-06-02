import type { Node, ValidationError } from '@markdoc/markdoc'

const assertValidChildren = (
  node: Node,
  validChildrenTags: string[],
): ValidationError[] => {
  const hasValidChildren = node.children.every((child) => {
    return (
      typeof child.tag === 'string' && validChildrenTags.includes(child.tag)
    )
  })
  if (!hasValidChildren) {
    return [
      {
        id: 'invalid-child-tags',
        level: 'error',
        message: `${node.tag} can only contain ${validChildrenTags.join(
          ', ',
        )} tags.`,
      },
    ]
  }

  return []
}

export { assertValidChildren }
