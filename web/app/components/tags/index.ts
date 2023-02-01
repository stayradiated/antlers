import { AccomodationTag } from './accomodation-tag'
import { DefinitionTag } from './definition-tag'
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
import { StoryPartialTag } from './story-partial-tag'
import { Strava } from './strava-tag'
import { Tip } from './tip-tag'
import { Travel } from './travel-tag'
import { TravelPartialTag } from './travel-partial-tag'
import { VideoTag } from './video-tag'

const components = {
  Accomodation: AccomodationTag,
  Definition: DefinitionTag,
  Extract,
  Image: ImageTag,
  Location: LocationTag,
  LocationPartial: LocationPartialTag,
  MapLegacy,
  MapPartial: MapPartialTag,
  MapPoint: MapPointTag,
  MapPointPartial: MapPointPartialTag,
  Place,
  Row,
  Sojourn: SojournTag,
  SojournPartial: SojournPartialTag,
  StoryPartial: StoryPartialTag,
  Strava,
  Tip,
  Travel,
  TravelPartial: TravelPartialTag,
  Video: VideoTag,
}

export { components }
