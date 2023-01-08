type LatLon = {
  latitude: number
  longitude: number
}

type XY = {
  x: number
  y: number
}

type BorderCoordinates = {
  east: number
  north: number
  south: number
  west: number
}
type Dimensions = {
  width: number
  height: number
}
type ImagePosition = {
  top: number
  left: number
}

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

const convLatLong = (latlon: LatLon, imageDimensions: Dimensions): XY => {
  const { latitude, longitude } = latlon
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
    {
      latitude: borderCoordinates.north,
      longitude: borderCoordinates.west,
    },
    projectDimensions,
  )
  return { left, top }
}

const localise = (
  point: LatLon,
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

export { localise }
