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
): Promise<ReferencedFile> => {
  const source = await fetchContent({ pageId: referenceKey })

  const {
    summary,
    frontmatter,
    referenceKeys: fileReferenceKeys,
  } = await parseMarkdoc({
    pageId: referenceKey,
    source: source.responseText,
    sourceHash: source.responseHash,
  })
  const references = await resolveReferenceKeys(fileReferenceKeys)

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
): Promise<References> => {
  const referencedFiles = Object.fromEntries(
    await Promise.all(
      referenceKeys.files.map(async (referenceKey) => {
        return [
          referenceKey,
          await resolveReferencedFile(referenceKey),
        ] as const
      }),
    ),
  )

  const referencedImages = Object.fromEntries(
    await Promise.all(
      referenceKeys.images.map(async (referenceKey) => {
        return [
          referenceKey,
          await resolveReferencedImage(referenceKey),
        ] as const
      }),
    ),
  )

  const references = {
    files: referencedFiles,
    images: referencedImages,
  }

  return references
}

export { resolveReferenceKeys }
