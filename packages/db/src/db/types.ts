import type { ColumnType } from 'kysely'
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export type Image = {
  id: string
  width: number
  height: number
  type: string
  space: string
  hasAlpha: number
  hasProfile: number
  channels: number
  orientation: number
  exif: string | null
}
export type Location = {
  id: string
  name: string
  region: string | null
  country: string
  latitude: number | null
  longitude: number | null
  countryMapFile: string | null
}
export type Map = {
  id: string
  name: string
  image: string
  source: string | null
  coordinatesNorth: number
  coordinatesEast: number
  coordinatesSouth: number
  coordinatesWest: number
}
export type Page = {
  id: string
  type: string | null
  content: string
  imageCount: number
  wordCount: number
}
export type PageImageRef = {
  pageId: string
  imageId: string
}
export type PageLocationRef = {
  pageId: string
  locationId: string
}
export type PageMapRef = {
  pageId: string
  mapId: string
}
export type PageSojournRef = {
  pageId: string
  sojournId: string
}
export type PageStoryRef = {
  pageId: string
  storyId: string
}
export type PageTravelRef = {
  pageId: string
  travelId: string
}
export type Sojourn = {
  id: string
  arriveAt: string
  departAt: string | null
  image: string | null
  locationFile: string | null
}
export type Story = {
  id: string
  title: string
  date: string
}
export type Travel = {
  id: string
  start: string
  end: string
  date: string
  mode: string
  coordinates: string
}
export type DB = {
  image: Image
  location: Location
  map: Map
  page: Page
  page_image_ref: PageImageRef
  page_location_ref: PageLocationRef
  page_map_ref: PageMapRef
  page_sojourn_ref: PageSojournRef
  page_story_ref: PageStoryRef
  page_travel_ref: PageTravelRef
  sojourn: Sojourn
  story: Story
  travel: Travel
}
