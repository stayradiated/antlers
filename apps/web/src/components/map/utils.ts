import type {
  XY,
  ImagePosition,
  Coordinate,
  Dimensions,
  CardinalCoordinates,
} from "./types.js";

const getGlobalDimensions = (
  imageCoordinates: CardinalCoordinates,
  imageDimensions: Dimensions
): Dimensions => {
  const imageWidthPercent =
    Math.abs(imageCoordinates.west - imageCoordinates.east) / 360;
  const imageHeightPercent =
    Math.abs(imageCoordinates.north - imageCoordinates.south) / 180;
  const globalHeight = imageDimensions.height / imageHeightPercent;
  const globalWidth = imageDimensions.width / imageWidthPercent;
  return { height: globalHeight, width: globalWidth };
};

const getPixelAsCoordinate = (
  xy: XY,
  globalDimensions: Dimensions
): Coordinate => {
  const { x, y } = xy;
  const { width, height } = globalDimensions;
  const lat = ((y / height) * 180 - 90) * -1;
  const long = (x / width) * 360 - 180;
  return [lat, long];
};

const getCoordinateAsPixel = (
  coordinate: Coordinate,
  globalDimensions: Dimensions
): XY => {
  const [latitude, longitude] = coordinate;
  const { width, height } = globalDimensions;
  const x = (longitude + 180) * (width / 360);
  const y = (latitude * -1 + 90) * (height / 180);
  return { x, y };
};

const getImagePosition = (
  imageCoordinates: CardinalCoordinates,
  globalDimensions: Dimensions
): ImagePosition => {
  const { x: left, y: top } = getCoordinateAsPixel(
    [imageCoordinates.north, imageCoordinates.west],
    globalDimensions
  );
  return { left, top };
};

const localisePoint = (
  point: Coordinate,
  imageCoordinates: CardinalCoordinates,
  imageDimensions: Dimensions
): XY => {
  const globalDimensions = getGlobalDimensions(
    imageCoordinates,
    imageDimensions
  );
  const xy = getCoordinateAsPixel(point, globalDimensions);
  const imagePosition = getImagePosition(imageCoordinates, globalDimensions);
  return {
    x: xy.x - imagePosition.left,
    y: xy.y - imagePosition.top,
  };
};

const localisePointPercent = (
  point: Coordinate,
  imageCoordinates: CardinalCoordinates,
  imageDimensions: Dimensions
): XY => {
  const { x, y } = localisePoint(point, imageCoordinates, imageDimensions);
  return {
    x: (x / imageDimensions.width) * 100,
    y: (y / imageDimensions.height) * 100,
  };
};

const localiseLine = (
  line: Coordinate[],
  imageCoordinates: CardinalCoordinates,
  imageDimensions: Dimensions
): XY[] => {
  const globalDimensions = getGlobalDimensions(
    imageCoordinates,
    imageDimensions
  );
  const imagePosition = getImagePosition(imageCoordinates, globalDimensions);

  return line.map((point) => {
    const xy = getCoordinateAsPixel(point, globalDimensions);

    return {
      x: xy.x - imagePosition.left,
      y: xy.y - imagePosition.top,
    };
  });
};

const getPortalCoordinates = (
  portalRelativeToImage: CardinalCoordinates,
  imageCoordinates: CardinalCoordinates,
  imageDimensions: Dimensions
): CardinalCoordinates => {
  const globalDimensions = getGlobalDimensions(
    imageCoordinates,
    imageDimensions
  );

  const imagePosition = getImagePosition(imageCoordinates, globalDimensions);

  const northWest = getPixelAsCoordinate(
    {
      y: imagePosition.top + portalRelativeToImage.north,
      x: imagePosition.left + portalRelativeToImage.west,
    },
    globalDimensions
  );
  const southEast = getPixelAsCoordinate(
    {
      y: imagePosition.top + portalRelativeToImage.south,
      x: imagePosition.left + portalRelativeToImage.east,
    },
    globalDimensions
  );

  return {
    north: northWest[0],
    east: southEast[1],
    south: southEast[0],
    west: northWest[1],
  };
};

export {
  localisePoint,
  localisePointPercent,
  localiseLine,
  getPortalCoordinates,
};
