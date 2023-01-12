import { localisePointPercent } from './utils'
import { SVGLine } from './svg-line'
import type { CardinalCoordinates, ViewPort } from './types'
import { useViewPort } from './use-view-port'
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
  animated?: boolean
}

type MapProps = {
  viewPort?: ViewPort

  image: ReferencedImage
  mapCoordinates: CardinalCoordinates

  points?: Point[]
  lines?: Line[]
}

const Map = (props: MapProps) => {
  const { mapCoordinates, image, points = [], lines = [] } = props
  const viewPort = props.viewPort ?? {
    aspectRatio: image.height / image.width,
    translate: [0, 0],
    scale: 1,
  }

  const srcWidth = image.width
  const srcHeight = image.height

  const {
    height,
    width,
    coordinates: viewPortCoordinates,
    outerStyle,
    innerStyle,
  } = useViewPort({
    srcCoordinates: mapCoordinates,
    srcWidth,
    srcHeight,
    viewPort,
  })

  return (
    <div className={cx('container')}>
      <div className={cx('zimg-container')} style={outerStyle}>
        <div className={cx('zimg-portal')} style={innerStyle}>
          <img className={cx('zimg-image')} src={image.urls.svg} />
        </div>
      </div>

      {points.map((point, index) => {
        const { coordinates, label, style } = point
        const { x: left, y: top } = localisePointPercent(
          coordinates,
          viewPortCoordinates,
          { width, height },
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
        {lines.map((line, index) => {
          const { coordinates, animated } = line
          return (
            <SVGLine
              key={index}
              lineCoordinates={coordinates}
              mapCoordinates={viewPortCoordinates}
              size={{ width, height }}
              animated={animated}
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
