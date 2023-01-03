import toml from '@ltd/j-toml'
import { $Frontmatter } from './types'
import type { Frontmatter } from './types'

const defaultFrontmatter: Frontmatter = {}

const parseFrontmatter = (input: unknown): Frontmatter => {
  if (typeof input !== 'string') {
    return defaultFrontmatter
  }

  const frontmatter = $Frontmatter.parse(toml.parse(input))
  return frontmatter
}

export { parseFrontmatter }
