import * as imaginary from "./imaginary.js";

const getImageUrl = (source: string, width: number): string => {
  return imaginary.sign("/resize", source, {
    width: String(width),
    type: "webp",
    quality: "75",
    stripmeta: "true",
  });
};

const getSquareImageUrl = (source: string, size: number) => {
  return imaginary.sign("/resize", source, {
    width: String(size),
    height: String(size),
    nocrop: "false",
    type: "webp",
    quality: "50",
    stripmeta: "true",
  });
};

const getImageUrlList = (source: string, widthList: number[]): string[] => {
  return widthList.map((width) => getImageUrl(source, width));
};

export { getSquareImageUrl, getImageUrl, getImageUrlList };
