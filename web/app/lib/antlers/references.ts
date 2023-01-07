import { errorListBoundary } from '@stayradiated/error-boundary'
import { fetchContent } from './fetch-content'
import { fetchImageInfo } from './image-info'
import { parseMarkdoc } from './markdoc-parse'
import { transformImage } from './transform-image'
import type {
  ReferencedFile,
  ReferencedImage,
  ReferenceKeys,
  References,
} from './types'

const resolveReferencedFile = async (
  referenceKey: string,
): Promise<ReferencedFile | Error> => {
  const source = await fetchContent({ pageId: referenceKey })
  if (source instanceof Error) {
    return source
  }

  const result = await parseMarkdoc({
    pageId: referenceKey,
    source: source.responseText,
    sourceHash: source.responseHash,
  })
  if (!result.success) {
    throw new Error(`Could not parse markdoc...`)
  }

  const { summary, frontmatter, referenceKeys: fileReferenceKeys } = result
  const references = await resolveReferenceKeys(fileReferenceKeys)
  if (references instanceof Error) {
    return references
  }

  return {
    frontmatter,
    summary,
    references,
  }
}

const resolveReferencedImage = async (
  referenceKey: string,
): Promise<ReferencedImage> => {
  const info = await fetchImageInfo({ source: referenceKey })
  const urls = transformImage({ source: referenceKey })

  return { width: info.width, height: info.height, urls }
}

const resolveReferenceKeys = async (
  referenceKeys: ReferenceKeys,
): Promise<References | Error> => {
  const referencedFilePairs = await errorListBoundary(async () =>
    Promise.all(
      referenceKeys.files.map(async (referenceKey) => {
        const referencedFile = await resolveReferencedFile(referenceKey)
        if (referencedFile instanceof Error) {
          return referencedFile
        }

        return [referenceKey, referencedFile] as const
      }),
    ),
  )
  if (referencedFilePairs instanceof Error) {
    return referencedFilePairs
  }

  const referencedFiles = Object.fromEntries(referencedFilePairs)

  const referencedImagePairs = await errorListBoundary(async () =>
    Promise.all(
      referenceKeys.images.map(async (referenceKey) => {
        const referencedImage = await resolveReferencedImage(referenceKey)
        return [referenceKey, referencedImage] as const
      }),
    ),
  )
  if (referencedImagePairs instanceof Error) {
    return referencedImagePairs
  }

  const referencedImages = Object.fromEntries(referencedImagePairs)

  const references = {
    files: referencedFiles,
    images: referencedImages,
  }

  return references
}

export { resolveReferenceKeys }
