import { sign } from './imaginary'
import { getCache } from './cache'

type ImageInfoOptions = {
  source: string
}

type ImageInfo = {
  width: number
  height: number
  type: string
  space: string
  hasAlpha: boolean
  hasProfile: boolean
  channels: number
  orientation: number
  exif?: {
    make?: string
    model?: string
    orientation?: number
    software?: string
    ycbcrPositioning?: number
    exifVersion?: string
    iso?: number
    componentsConfiguration?: string
    focalLengthIn35mmFilm?: number
    exifImageWidth?: number
    exifImageHeight?: number
    xResolution?: string
    yResolution?: string
    dateTime?: string
    dateTimeOriginal?: string
    dateTimeDigitized?: string
    fNumber?: string
    exposureTime?: string
    exposureProgram?: string
    shutterSpeedValue?: string
    apertureValue?: string
    brightnessValue?: string
    exposureCompensation?: string
    meteringMode?: string
    flashMode?: string
    focalLength?: string
    subjectArea?: number[]
    colorSpace?: string
    sensingMethod?: string
    sceneType?: string
    gps?: {
      latitude?: number
      longitude?: number
      altitude?: string
      speed?: string
      direction?: number
      directionRef?: string
    }
  }
}

const fetchImageInfo = async (
  options: ImageInfoOptions,
): Promise<ImageInfo> => {
  const { source } = options

  const cache = await getCache()

  const cacheKey = `info:${source}`

  return cache.wrap(cacheKey, async () => {
    const url = sign('/info', source, {})
    console.log(url, 'FETCH')
    const response = await fetch(url)
    const content = (await response.json()) as ImageInfo
    console.log(url, 'DONE')
    return content
  })
}

export { fetchImageInfo }
