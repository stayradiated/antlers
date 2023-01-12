import type { ReferencedImage } from '~/lib/antlers/index'

type Photo = {
  src: string
  srcSet: string[]
  aspectRatio: number
  width: number
  height: number
}

const usePhoto = (input: ReferencedImage): Photo => {
  const { urls, width, height } = input
  const aspectRatio = width / height

  const srcSet = [...Object.entries(urls.byWidth)].map(([width, url]) => {
    return `${url} ${width}w`
  })
  const maxWidthUrl = urls.byWidth[2500]

  return {
    src: maxWidthUrl,
    srcSet,
    aspectRatio,
    width,
    height,
  }
}

const usePhotoMaybe = (
  input: ReferencedImage | undefined,
): Photo | undefined => {
  if (typeof input === 'undefined') {
    return undefined
  }

  return usePhoto(input)
}

export { usePhoto, usePhotoMaybe }
