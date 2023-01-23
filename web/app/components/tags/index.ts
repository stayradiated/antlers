import { AccomodationTag } from './accomodation-tag'
import { Extract } from './extract-tag'
import { ImageTag } from './image-tag'
import { LocationPartialTag } from './location-partial-tag'
import { LocationTag } from './location-tag'
import { MapLegacy } from './map-legacy-tag'
import { MapPartialTag } from './map-partial-tag'
import { MapPointPartialTag } from './map-point-partial-tag'
import { MapPointTag } from './map-point-tag'
import { Place } from './place-tag'
import { Row } from './row-tag'
import { SojournPartialTag } from './sojourn-partial-tag'
import { SojournTag } from './sojourn-tag'
import { Strava } from './strava-tag'
import { Tip } from './tip-tag'
import { TravelPartialTag } from './travel-partial-tag'
import { Travel } from './travel-tag'
import { VideoTag } from './video-tag'

const components = {
  Accomodation: AccomodationTag,
  Extract,
  Image: ImageTag,
  LocationPartial: LocationPartialTag,
  Location: LocationTag,
  MapLegacy,
  MapPartial: MapPartialTag,
  MapPointPartial: MapPointPartialTag,
  MapPoint: MapPointTag,
  Place,
  Row,
  SojournPartial: SojournPartialTag,
  Sojourn: SojournTag,
  Strava,
  Tip,
  TravelPartial: TravelPartialTag,
  Travel,
  Video: VideoTag,
}

export { components }
