import type { CardinalCoordinates, ViewPort } from "./types.js";
import { getPortalCoordinates } from "./utils.js";

type TransformOptions = {
  width: number;
  height: number;
  coordinates: CardinalCoordinates;
  viewPort: ViewPort;
};

const transform = (options: TransformOptions) => {
  const {
    width: srcWidth,
    height: srcHeight,
    coordinates: srcCoordinates,
    viewPort,
  } = options;
  const { aspectRatio, translate, scale } = viewPort;

  const translatedTop = (translate[1] / 100) * srcHeight * -1;
  const translatedLeft = (translate[0] / 100) * srcWidth * -1;

  const scaledWidth = srcWidth / scale;
  const scaledHeight = srcHeight / scale;
  const scaledTopOffset = (srcHeight - scaledHeight) / 2;
  const scaledLeftOffset = (srcWidth - scaledWidth) / 2;

  const width = scaledWidth;
  const height = aspectRatio * scaledWidth;
  const top = translatedTop + scaledTopOffset;
  const left = translatedLeft + scaledLeftOffset;

  const portal = {
    north: top,
    west: left,
    south: top + height,
    east: left + width,
  };

  const coordinates = getPortalCoordinates(portal, srcCoordinates, {
    width: srcWidth,
    height: srcHeight,
  });

  return {
    top,
    left,
    width,
    height,
    coordinates,
  };
};

type UseViewPortOptions = {
  srcWidth: number;
  srcHeight: number;
  srcCoordinates: CardinalCoordinates;
  viewPort: ViewPort;
};

const useViewPort = (options: UseViewPortOptions) => {
  const { srcWidth, srcHeight, srcCoordinates, viewPort } = options;
  const { aspectRatio, translate, scale } = viewPort;

  const details = transform({
    width: srcWidth,
    height: srcHeight,
    coordinates: srcCoordinates,
    viewPort,
  });

  return {
    ...details,
    outerStyle: {
      paddingBottom: `${100 * aspectRatio}%`,
    },
    innerStyle: {
      transform: `scale(${scale}) translate(${translate[0]}%, ${translate[1]}%)`,
    },
  };
};

export { useViewPort };
