import invariant from 'tiny-invariant'
import type {
  References,
  TravelFrontmatter,
  LocationFrontmatter,
  SojournFrontmatter,
  MapFrontmatter,
  ReferencedFile,
  ReferencedImage,
} from './antlers/index'

const getSojournFrontmatter = (
  name: string,
  references: References,
): SojournFrontmatter => {
  const file = references.files[name]
  invariant(file, `File "${name}" does not exist in references.`)

  invariant(
    file.frontmatter.type === 'sojourn',
    `File "${name}" does not have correct type. Expected "sojourn", found "${file.frontmatter.type}".`,
  )

  return file.frontmatter
}

type ReferencedLocationFile = ReferencedFile & {
  frontmatter: LocationFrontmatter
}

const getLocationFile = (
  name: string,
  references: References,
): ReferencedLocationFile => {
  const file = references.files[name]
  invariant(file, `File "${name}" does not exist in references.`)

  invariant(
    file.frontmatter.type === 'location',
    `File "${name}" does not have correct type. Expected "location", found "${file.frontmatter.type}".`,
  )

  return file as ReferencedLocationFile
}

type ReferencedMapFile = ReferencedFile & {
  frontmatter: MapFrontmatter
}

const getMapFile = (
  name: string,
  references: References,
): ReferencedMapFile => {
  const file = references.files[name]
  invariant(file, `File "${name}" does not exist in references.`)

  invariant(
    file.frontmatter.type === 'map',
    `File "${name}" does not have correct type. Expected "map", found "${file.frontmatter.type}".`,
  )

  return file as ReferencedMapFile
}

const getTravelFrontmatter = (
  name: string,
  references: References,
): TravelFrontmatter => {
  const file = references.files[name]
  invariant(file, `File "${name}" does not exist in references.`)

  invariant(
    file.frontmatter.type === 'travel',
    `File "${name}" does not have correct type. Expected "travel", found "${file.frontmatter.type}".`,
  )

  return file.frontmatter
}

const getImage = (name: string, references: References): ReferencedImage => {
  const image = references.images[name]
  invariant(image, `Image "${name}" does not exist in references.`)
  return image
}

export {
  getSojournFrontmatter,
  getLocationFile,
  getTravelFrontmatter,
  getMapFile,
  getImage,
}
