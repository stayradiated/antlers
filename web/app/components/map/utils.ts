import type {
  XY,
  ImagePosition,
  Coordinate,
  Dimensions,
  BorderCoordinates,
} from './types'

const getProjectionDimensions = (
  borderCoordinates: BorderCoordinates,
  imageDimensions: Dimensions,
): Dimensions => {
  const imageWidthPercent =
    Math.abs(borderCoordinates.west - borderCoordinates.east) / 360
  const imageHeightPercent =
    Math.abs(borderCoordinates.north - borderCoordinates.south) / 180
  const projectHeight = imageDimensions.height / imageHeightPercent
  const projectWidth = imageDimensions.width / imageWidthPercent
  return { height: projectHeight, width: projectWidth }
}

const convLatLong = (
  coordinate: Coordinate,
  imageDimensions: Dimensions,
): XY => {
  const [latitude, longitude] = coordinate
  const { width, height } = imageDimensions
  const x = (longitude + 180) * (width / 360)
  const y = (latitude * -1 + 90) * (height / 180)
  return { x, y }
}

const getImagePosition = (
  borderCoordinates: BorderCoordinates,
  projectDimensions: Dimensions,
): ImagePosition => {
  const { x: left, y: top } = convLatLong(
    [borderCoordinates.north, borderCoordinates.west],
    projectDimensions,
  )
  return { left, top }
}

const localisePoint = (
  point: Coordinate,
  borderCoordinates: BorderCoordinates,
  imageDimensions: Dimensions,
): XY => {
  const projectDimensions = getProjectionDimensions(
    borderCoordinates,
    imageDimensions,
  )
  const xy = convLatLong(point, projectDimensions)
  const imagePosition = getImagePosition(borderCoordinates, projectDimensions)
  return {
    x: ((xy.x - imagePosition.left) / imageDimensions.width) * 100,
    y: ((xy.y - imagePosition.top) / imageDimensions.height) * 100,
  }
}

const localiseLine = (
  line: Coordinate[],
  borderCoordinates: BorderCoordinates,
  imageDimensions: Dimensions,
): XY[] => {
  const projectDimensions = getProjectionDimensions(
    borderCoordinates,
    imageDimensions,
  )
  const imagePosition = getImagePosition(borderCoordinates, projectDimensions)

  return line.map((point) => {
    const xy = convLatLong(point, projectDimensions)

    return {
      x: xy.x - imagePosition.left,
      y: xy.y - imagePosition.top,
    }
  })
}

export { localisePoint, localiseLine }
