import { localiseLine } from './utils'
import type { Coordinate, BorderCoordinates, Dimensions } from './types'

type SVGLineProps = {
  lineCoordinates: Coordinate[]
  mapCoordinates: BorderCoordinates
  size: Dimensions
}

const SVGLine = (props: SVGLineProps) => {
  const { lineCoordinates, mapCoordinates, size } = props

  const xyList = localiseLine(lineCoordinates, mapCoordinates, size)
  const path =
    'M ' +
    xyList.map(({ x, y }) => `${Math.round(x)} ${Math.round(y)}`).join(' L ')

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${size.width} ${size.height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} fill="transparent" stroke="white" strokeWidth="3" />
    </svg>
  )
}

export { SVGLine }
