import * as Place from '../place/index'
import type { PlaceTagProps } from '~/lib/antlers/markdoc/tags/index'

const PlaceTag = (props: PlaceTagProps) => {
  return <Place.Card {...props} />
}

export { PlaceTag }
