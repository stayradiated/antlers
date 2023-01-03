type Photo = {
  src: string
  srcSet: string[]
  aspectRatio: number
  width: number
  height: number
}

type Input = {
  urls: Record<string, string>
  width: number
  height: number
}

const usePhoto = (input: Input): Photo => {
  const { urls, width, height } = input
  const aspectRatio = width / height

  const srcSet = [...Object.entries(urls)].map(([width, url]) => {
    return `${url} ${width}w`
  })

  const maxWidth = Math.max(
    ...[...Object.keys(urls)].map((n) => Number.parseInt(n, 10)),
  )
  const maxWidthUrl = urls[maxWidth]

  return {
    src: maxWidthUrl,
    srcSet,
    aspectRatio,
    width,
    height,
  }
}

const usePhotoMaybe = (input: Input | undefined): Photo | undefined => {
  if (typeof input === 'undefined') {
    return undefined
  }

  return usePhoto(input)
}

export { usePhoto, usePhotoMaybe }
