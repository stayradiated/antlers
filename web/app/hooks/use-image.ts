type CachedImage = {
  type: 'cached'
  src: string
  srcSet: string[]
  aspectRatio: number
  width: number
  height: number
}

type RegularImage = {
  type: 'standard'
  src: string
}

type Image = CachedImage | RegularImage

const useImage = (src: string | undefined): Image | undefined => {
  if (typeof src === 'undefined') {
    return undefined
  }

  if (src.startsWith('cache:')) {
    const [_prefix, id, widthString, heightString] = src.split(':')
    const width = Number.parseInt(widthString, 10)
    const height = Number.parseInt(heightString, 10)

    const getImgUrl = (res: number): string => {
      return `https://cat.stayradiated.com/where-is-george-czabania/image/${id}/${res}.jpg`
      // Return `http://localhost:8080/${id}/${res}.jpg`
    }

    const aspectRatio = width / height

    const srcSet = [
      `${getImgUrl(500)} 500`,
      `${getImgUrl(750)} 750w`,
      `${getImgUrl(1000)} 1000w`,
      `${getImgUrl(1280)} 1280w`,
      `${getImgUrl(1500)} 1500w`,
      `${getImgUrl(2000)} 2000w`,
      `${getImgUrl(2500)} 2500w`,
    ]

    return {
      type: 'cached',
      src: getImgUrl(2500),
      srcSet,
      aspectRatio,
      width,
      height,
    }
  }

  return {
    type: 'standard',
    src,
  }
}

export { useImage }
