type Photo = {
  src: string
  srcSet: string[]
  aspectRatio: number
  width: number
  height: number
}

const usePhoto = (src: string): Photo => {
  if (!src.startsWith('cache•')) {
    return {
      src,
      srcSet: [],
      aspectRatio: 0,
      width: 0,
      height: 0,
    }
  }

  const [_prefix, url, widthString, heightString] = src.split('•')
  const width = Number.parseInt(widthString, 10)
  const height = Number.parseInt(heightString, 10)

  const getImgUrl = (resolution: number): string => {
    return new URL(`${resolution}.jpg`, url).href
  }

  const aspectRatio = width / height

  const srcSet = [
    `${getImgUrl(500)} 500w`,
    `${getImgUrl(750)} 750w`,
    `${getImgUrl(1000)} 1000w`,
    `${getImgUrl(1280)} 1280w`,
    `${getImgUrl(1500)} 1500w`,
    `${getImgUrl(2000)} 2000w`,
    `${getImgUrl(2500)} 2500w`,
  ]

  return {
    src: getImgUrl(2500),
    srcSet,
    aspectRatio,
    width,
    height,
  }
}

const usePhotoMaybe = (src: string | undefined): Photo | undefined => {
  if (typeof src === 'undefined') {
    return undefined
  }

  return usePhoto(src)
}

export { usePhoto, usePhotoMaybe }
