import * as z from 'zod'

const $Summary = z.object({
  imageCount: z.number(),
  wordCount: z.number(),
})
type Summary = z.infer<typeof $Summary>

const $SojournFrontmatter = z.object({
  type: z.literal('sojourn'),
  arriveAt: z.string().optional(),
  departAt: z.string().optional(),
  location: z.string().optional(),
  country: z.string().optional(),
  image: z.string().optional(),
  locationFile: z.string().optional(),
})
type SojournFrontmatter = z.infer<typeof $SojournFrontmatter>

const $LocationFrontmatter = z.object({
  type: z.literal('location'),
  name: z.string(),
  region: z.string(),
  country: z.string(),
  countryMapFile: z.string().optional(),
  coordinates: z.tuple([z.number(), z.number()]).optional(),
})
type LocationFrontmatter = z.infer<typeof $LocationFrontmatter>

const $MapFrontmatter = z.object({
  type: z.literal('map'),
  name: z.string(),
  image: z.string(),
  source: z.string().optional(),
  coordinates: z.object({
    north: z.number(),
    east: z.number(),
    south: z.number(),
    west: z.number(),
  }),
})
type MapFrontmatter = z.infer<typeof $MapFrontmatter>

const $TravelFrontmatter = z.object({
  type: z.literal('travel'),
  start: z.string(),
  end: z.string(),
  date: z.string(),
  mode: z.string(),
  coordinates: z.array(z.tuple([z.number(), z.number()])),
})
type TravelFrontmatter = z.infer<typeof $TravelFrontmatter>

const $Frontmatter = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(undefined),
  }),
  $SojournFrontmatter,
  $LocationFrontmatter,
  $MapFrontmatter,
  $TravelFrontmatter,
])
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
  frontmatterReferences: $References,
  summary: $Summary,
})
type ReferencedFile = z.infer<typeof $ReferencedFile>

const $ReferencedImage = z.object({
  width: z.number(),
  height: z.number(),
  urls: z.record(z.string(), z.string()),
})
type ReferencedImage = z.infer<typeof $ReferencedImage>

const $FetchContentResult = z.object({
  createdAt: z.date(),
  etag: z.string().optional(),
  responseHash: z.string(),
  responseText: z.string(),
})
type FetchContentResult = z.infer<typeof $FetchContentResult>

export {
  $Frontmatter,
  $ReferenceKeys,
  $ReferencedFile,
  $ReferencedImage,
  $References,
  $Summary,
  $FetchContentResult,
}
export type {
  Frontmatter,
  ReferenceKeys,
  ReferencedFile,
  ReferencedImage,
  References,
  Summary,
  FetchContentResult,
  SojournFrontmatter,
  LocationFrontmatter,
  MapFrontmatter,
  TravelFrontmatter,
}
