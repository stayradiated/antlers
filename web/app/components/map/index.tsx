import { localisePoint } from './utils'
import { SVGLine } from './svg-line'
import type { ReferencedImage } from '~/lib/antlers/index'
import { createCX } from '~/lib/class-name'

const cx = createCX('map', 'Map')

type PointStyle = 'start'

type Point = {
  label: string
  coordinates: [number, number]
  style?: PointStyle
}

type Line = {
  coordinates: Array<[number, number]>
}

type MapProps = {
  image: ReferencedImage
  mapCoordinates: {
    north: number
    south: number
    east: number
    west: number
  }
  points?: Point[]
  lines?: Line[]
}

const Map = (props: MapProps) => {
  const { image, mapCoordinates, points = [], lines = [] } = props

  return (
    <div className={cx('container')}>
      <img className={cx('image')} src={image.urls['1250']} />
      {points.map((point, index) => {
        const { coordinates, label, style } = point
        const { x: left, y: top } = localisePoint(
          coordinates,
          mapCoordinates,
          image,
        )
        return (
          <div
            key={index}
            className={cx('point', style && cx(`point-${style}`))}
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            <span className={cx('label')}>{label}</span>
          </div>
        )
      })}
      <div className={cx('lines')}>
        {lines.map((line) => {
          const { coordinates } = line
          return (
            <SVGLine
              lineCoordinates={coordinates}
              mapCoordinates={mapCoordinates}
              size={image}
            />
          )
        })}
      </div>
    </div>
  )
}

export { Map }
export { default as MapCSS } from './styles.css'
export type { Point, Line }
