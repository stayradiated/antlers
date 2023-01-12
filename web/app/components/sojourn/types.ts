import type { ReferencedImage } from '~/lib/antlers'

export type ResolvedSummary = {
  wordCount: number
  imageCount: number
  images: ReferencedImage[]
}
