import invariant from 'tiny-invariant'
import type {
  References,
  Frontmatter,
  ReferencedFile,
  ReferencedImage,
} from './antlers/index'

type FrontmatterType = NonNullable<Frontmatter['type']>

type TypedReferencedFile<T extends FrontmatterType> = Omit<
  ReferencedFile,
  'frontmatter'
> & {
  frontmatter: Frontmatter & { type: T }
}

const getFile = <T extends FrontmatterType>(
  type: T,
  name: string,
  references: References,
): TypedReferencedFile<T> => {
  const file = references.files[name]
  invariant(file, `File "${name}" does not exist in references.`)

  invariant(
    file.frontmatter.type === type,
    `File "${name}" does not have correct type. Expected "${type}", found "${JSON.stringify(
      file.frontmatter.type,
    )}".`,
  )

  return file as TypedReferencedFile<T>
}

const getImage = (name: string, references: References): ReferencedImage => {
  const image = references.images[name]
  invariant(image, `Image "${name}" does not exist in references.`)
  return image
}

export { getFile, getImage }
