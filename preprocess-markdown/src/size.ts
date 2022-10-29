import { execa, execaSync } from 'execa'
import { errorBoundary, errorBoundarySync } from '@stayradiated/error-boundary'

type ImagePath = {
  width: number
  height: number
}

const parseFileResult = (stdout: string): ImagePath => {
  const match = /\s(\d\d+)x(\d\d+),/.exec(stdout)
  const width = Number.parseInt(match?.[1] ?? '0', 10)
  const height = Number.parseInt(match?.[2] ?? '0', 10)
  return { width, height }
}

const getImageSize = async (imagePath: string): Promise<ImagePath | Error> => {
  return errorBoundary(async () => {
    const result = await execa('file', [imagePath])
    return parseFileResult(result.stdout)
  })
}

const getImageSizeSync = (imagePath: string): ImagePath | Error => {
  return errorBoundarySync(() => {
    const result = execaSync('file', [imagePath])
    return parseFileResult(result.stdout)
  })
}

export { getImageSize, getImageSizeSync }
