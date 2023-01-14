import { Link } from '@remix-run/react'
import { localisePointPercent } from './utils'
import type { Point, CardinalCoordinates, Dimensions } from './types'
import { createCX } from '~/lib/class-name'

const cx = createCX('map', 'MapPoint')

type PointProps = {
  point: Point
  viewPortCoordinates: CardinalCoordinates
  viewPortSize: Dimensions
}

const MapPoint = (props: PointProps) => {
  const { point, viewPortCoordinates, viewPortSize } = props
  const { coordinates, label, style, href } = point
  const { x: left, y: top } = localisePointPercent(
    coordinates,
    viewPortCoordinates,
    viewPortSize,
  )

  const child = (
    <div
      className={cx('container', style && cx(`style-${style}`))}
      style={{ top: `${top}%`, left: `${left}%` }}
    >
      <span className={cx('label')}>{label}</span>
    </div>
  )

  return href ? <Link to={href}>{child}</Link> : child
}

export { MapPoint }
