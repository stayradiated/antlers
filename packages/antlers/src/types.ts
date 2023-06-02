import * as z from 'zod'

type ImaginaryConfig = {
  host: string
  signatureKey: string
}

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

const $SojournFrontmatter = z
  .object({
    type: z.literal('sojourn'),
    arriveAt: z.string(),
    departAt: z.string().optional(),
    image: z.string().optional(),
    locationFile: z.string().optional(),
  })
  .passthrough()
type SojournFrontmatter = z.infer<typeof $SojournFrontmatter>

const $LocationFrontmatter = z
  .object({
    type: z.literal('location'),
    name: z.string(),
    region: z.string().optional(),
    country: z.string(),
    countryMapFile: z.string().optional(),
    coordinates: z.tuple([z.number(), z.number()]).optional(),
  })
  .passthrough()
type LocationFrontmatter = z.infer<typeof $LocationFrontmatter>

const $MapFrontmatter = z
  .object({
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
  .passthrough()
type MapFrontmatter = z.infer<typeof $MapFrontmatter>

const $TravelFrontmatter = z
  .object({
    type: z.literal('travel'),
    start: z.string(),
    end: z.string(),
    date: z.string(),
    mode: z.string(),
    coordinates: z.array(z.tuple([z.number(), z.number()])),
  })
  .passthrough()
type TravelFrontmatter = z.infer<typeof $TravelFrontmatter>

const $StoryFrontmatter = z
  .object({
    type: z.literal('story'),
    title: z.string(),
    date: z.string(),
  })
  .passthrough()
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

const $FrontmatterType = z.union([
  z.literal('undefined'),
  $SojournFrontmatter.shape.type,
  $LocationFrontmatter.shape.type,
  $MapFrontmatter.shape.type,
  $TravelFrontmatter.shape.type,
  $StoryFrontmatter.shape.type,
])
type FrontmatterType = z.infer<typeof $FrontmatterType>

const $ReferenceKey = z.object({
  type: z.string(),
  id: z.string(),
})
type ReferenceKey = z.infer<typeof $ReferenceKey>

type Reference =
  | {
      type: string
      id: string
      file: ReferencedFile
    }
  | {
      type: 'image'
      id: string
      image: ReferencedImage
    }

const $Reference: z.ZodType<Reference> = z.lazy(() =>
  z.discriminatedUnion('type', [
    z.object({
      type: z.string(),
      id: z.string(),
      file: $ReferencedFile,
    }),
    z.object({
      type: z.literal('image'),
      id: z.string(),
      image: $ReferencedImage,
    }),
  ]),
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
})
type Summary = z.infer<typeof $Summary>

const $ReferencedFile = z.object({
  frontmatter: $Frontmatter,
  references: z.array($Reference),
  summary: $Summary,
  summaryReferences: z.array($Reference),
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
  $ReferenceKey,
  $ReferencedFile,
  $ReferencedImage,
  $Reference,
  $Summary,
  $FetchContentResult,
  $FetchImageInfoResult,
}
export type {
  ImaginaryConfig,
  FetchContentResult,
  FetchImageInfoResult,
  Frontmatter,
  FrontmatterType,
  LocationFrontmatter,
  MapFrontmatter,
  ReferenceKey,
  ReferencedFile,
  ReferencedImage,
  Reference,
  SojournFrontmatter,
  StoryFrontmatter,
  Summary,
  TravelFrontmatter,
}
