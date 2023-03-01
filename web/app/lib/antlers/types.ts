import * as z from 'zod'

const $FetchImageInfoResult = z.object({
  width: z.number(),
  height: z.number(),
  type: z.string(),
  space: z.string(),
  hasAlpha: z.boolean(),
  hasProfile: z.boolean(),
  channels: z.number(),
  orientation: z.number(),
  exif: z.unknown().optional(),
})
type FetchImageInfoResult = z.infer<typeof $FetchImageInfoResult>

const $SojournFrontmatter = z.object({
  type: z.literal('sojourn'),
  arriveAt: z.string(),
  departAt: z.string().optional(),
  image: z.string().optional(),
  locationFile: z.string().optional(),

  // Deprecated, use locationFile instead
  location: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
})
type SojournFrontmatter = z.infer<typeof $SojournFrontmatter>

const $LocationFrontmatter = z.object({
  type: z.literal('location'),
  name: z.string(),
  region: z.string().optional(),
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

const $StoryFrontmatter = z.object({
  type: z.literal('story'),
  title: z.string(),
  date: z.string(),
})
type StoryFrontmatter = z.infer<typeof $StoryFrontmatter>

const $Frontmatter = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(undefined),
  }),
  $SojournFrontmatter,
  $LocationFrontmatter,
  $MapFrontmatter,
  $TravelFrontmatter,
  $StoryFrontmatter,
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

const $ReferencedImage = z.object({
  width: z.number(),
  height: z.number(),
  urls: z.object({
    svg: z.string(),
    square: z.object({
      32: z.string(),
    }),
    byWidth: z.object({
      16: z.string(),
      320: z.string(),
      625: z.string(),
      1250: z.string(),
      2500: z.string(),
    }),
  }),
})
type ReferencedImage = z.infer<typeof $ReferencedImage>

const $Summary = z.object({
  imageCount: z.number(),
  wordCount: z.number(),
  images: z.array(z.string()),
})
type Summary = z.infer<typeof $Summary>

const $ReferencedFile = z.object({
  frontmatter: $Frontmatter,
  frontmatterReferences: $References,
  summary: $Summary,
  summaryReferences: $References,
})
type ReferencedFile = z.infer<typeof $ReferencedFile>

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
  $FetchImageInfoResult,
}
export type {
  FetchContentResult,
  FetchImageInfoResult,
  Frontmatter,
  LocationFrontmatter,
  MapFrontmatter,
  ReferenceKeys,
  ReferencedFile,
  ReferencedImage,
  References,
  SojournFrontmatter,
  StoryFrontmatter,
  Summary,
  TravelFrontmatter,
}
