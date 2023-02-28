import { SVGLine } from './svg-line'
import type { CardinalCoordinates, ViewPort, Point, Line } from './types'
import { useViewPort } from './use-view-port'
import { MapPoint } from './map-point'
import type { ReferencedImage } from '~/lib/antlers/index'
import { createCX } from '~/lib/class-name'

const cx = createCX('map', 'Map')

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

  const viewPortSize = { width, height }

  return (
    <div className={cx('container')}>
      <div className={cx('zimg-container')} style={outerStyle}>
        <div className={cx('zimg-portal')} style={innerStyle}>
          <img className={cx('zimg-image')} src={image.urls.svg} />
        </div>
      </div>

      {points.map((point, index) => (
        <MapPoint
          key={index}
          point={point}
          viewPortCoordinates={viewPortCoordinates}
          viewPortSize={viewPortSize}
        />
      ))}

      <div className={cx('lines')}>
        {lines.map((line, index) => {
          const { coordinates, animated, strokeWidth } = line
          return (
            <SVGLine
              key={index}
              lineCoordinates={coordinates}
              mapCoordinates={viewPortCoordinates}
              size={viewPortSize}
              animated={animated}
              strokeWidth={strokeWidth}
            />
          )
        })}
      </div>
    </div>
  )
}

export { Map }
