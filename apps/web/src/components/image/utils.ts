import { getImageUrlList } from "~/photo.js";
import type { Image } from "~/db.js";

type RenderableImage = {
  src: string;
  srcSet: string[];
  aspectRatio: number;
  width: number;
  height: number;
};

const defaultWidthList = [16, 320, 640, 960, 1280, 1920, 2500];

type Options = Pick<Image, "id" | "width" | "height">;

const buildRenderableImage = (options: Options): RenderableImage => {
  const { id, width, height } = options;
  const aspectRatio = width / height;

  const urls = getImageUrlList(id, defaultWidthList);
  const srcSet = defaultWidthList.map((width, index) => {
    const url = urls[index];
    return `${url} ${width}w`;
  });
  const maxWidthUrl = urls.slice(-1)[0]!;

  return {
    src: maxWidthUrl,
    srcSet,
    aspectRatio,
    width,
    height,
  };
};

export { buildRenderableImage };
