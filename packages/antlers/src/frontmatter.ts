import toml from '@ltd/j-toml'
import { $Frontmatter } from './types.js'
import type { Frontmatter } from './types.js'

const defaultFrontmatter: Frontmatter = {}

const parseFrontmatter = (input: unknown): Frontmatter | Error => {
  if (typeof input !== 'string') {
    return defaultFrontmatter
  }

  const frontmatter = $Frontmatter.safeParse(
    toml.parse(input, {
      bigint: false,
    }),
  )

  if (!frontmatter.success) {
    return new Error('parseFrontmatter: could not parse frontmatter', {
      cause: frontmatter.error,
    })
  }

  return frontmatter.data
}

export { parseFrontmatter }
