import * as z from 'zod'

const $Summary = z.object({
  imageCount: z.number(),
  wordCount: z.number(),
})
type Summary = z.infer<typeof $Summary>

const $Frontmatter = z.object({
  arriveAt: z.string().optional(),
  departAt: z.string().optional(),
  location: z.string().optional(),
  country: z.string().optional(),
  image: z.string().optional(),
})
type Frontmatter = z.infer<typeof $Frontmatter>

const $ReferenceKeys = z.object({
  files: z.array(z.string()),
  images: z.array(z.string()),
})
type ReferenceKeys = z.infer<typeof $ReferenceKeys>

type References = {
  files: Record<string, ReferencedFile>
  images: Record<string, ReferencedImage>
}

const $References: z.ZodType<References> = z.lazy(() =>
  z.object({
    files: z.record(z.string(), $ReferencedFile),
    images: z.record(z.string(), $ReferencedImage),
  }),
)

const $ReferencedFile = z.object({
  frontmatter: $Frontmatter,
  summary: $Summary,
  references: $References,
})
type ReferencedFile = z.infer<typeof $ReferencedFile>

const $ReferencedImage = z.object({
  width: z.number(),
  height: z.number(),
  urls: z.record(z.number(), z.string()),
})
type ReferencedImage = z.infer<typeof $ReferencedImage>

export {
  $Frontmatter,
  $ReferenceKeys,
  $ReferencedFile,
  $ReferencedImage,
  $References,
  $Summary,
}
export type {
  Frontmatter,
  ReferenceKeys,
  ReferencedFile,
  ReferencedImage,
  References,
  Summary,
}
