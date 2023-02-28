import { createCX } from '../../lib/class-name'
import { localiseLine } from './utils'
import type { Coordinate, CardinalCoordinates, Dimensions } from './types'

const cx = createCX('map', 'SVGLine')

type SVGLineProps = {
  lineCoordinates: Coordinate[]
  mapCoordinates: CardinalCoordinates
  size: Dimensions
  animated?: boolean
  strokeWidth?: number
}

const SVGLine = (props: SVGLineProps) => {
  const { lineCoordinates, mapCoordinates, size, animated = false, strokeWidth } = props

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
      className={cx('container')}
    >
      <path className={cx('path', animated && cx('path-animated'))} d={path} strokeWidth={strokeWidth} />
    </svg>
  )
}

export { SVGLine }
