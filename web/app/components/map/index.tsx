import { localise } from './utils'
import type { ReferencedImage } from '~/lib/antlers/index'
import { createCX } from '~/lib/class-name'

const cx = createCX('map', 'Map')

type Point = {
  label: string
  coordinates: [number, number]
}

type MapProps = {
  image: ReferencedImage
  mapCoordinates: {
    north: number
    south: number
    east: number
    west: number
  }
  points: Point[]
}

const Map = (props: MapProps) => {
  const { image, mapCoordinates, points } = props

  return (
    <div className={cx('container')}>
      <img className={cx('image')} src={image.urls['1250']} />
      {points.map((point) => {
        const { coordinates, label } = point
        const { x: left, y: top } = localise(
          { latitude: coordinates[0], longitude: coordinates[1] },
          mapCoordinates,
          image,
        )
        return (
          <div
            className={cx('point')}
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            <span className={cx('label')}>{label}</span>
          </div>
        )
      })}
    </div>
  )
}

export { Map }
export { default as MapCSS } from './styles.css'
