import { localise } from './utils'
import type { ReferencedImage } from '~/lib/antlers/index'
import { createCX } from '~/lib/class-name'

const cx = createCX('map', 'Map')

type MapProps = {
  image: ReferencedImage
  label: string
  coordinates: {
    latitude: number
    longitude: number
  }
  mapCoordinates: {
    north: number
    south: number
    east: number
    west: number
  }
}

const Map = (props: MapProps) => {
  const { label, coordinates, image, mapCoordinates } = props
  const point = localise(coordinates, mapCoordinates, image)

  return (
    <div className={cx('container')}>
      <img className={cx('image')} src={image.urls['1250']} />
      <div
        className={cx('point')}
        style={{
          top: `${point.y}%`,
          left: `${point.x}%`,
        }}
      >
        <span className={cx('label')}>{label}</span>
      </div>
    </div>
  )
}

export { Map }
export { default as MapCSS } from './styles.css'
