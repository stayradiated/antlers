import { CONTENT_HOST } from '../config.server'
import { sign } from './imaginary'

type TransformImageOptions = {
  source: string
}

const transformImage = (options: TransformImageOptions) => {
  const { source } = options

  return {
    16: sign('/resize', source, {
      width: '16',
      type: 'webp',
      quality: '80',
      stripmeta: 'true',
    }),
    625: sign('/resize', source, {
      width: '625',
      type: 'webp',
      quality: '80',
      stripmeta: 'true',
    }),
    1250: sign('/resize', source, {
      width: '1250',
      type: 'webp',
      quality: '80',
      stripmeta: 'true',
    }),
    2500: sign('/resize', source, {
      width: '2500',
      type: 'webp',
      quality: '80',
      stripmeta: 'true',
    }),
    svg: `${CONTENT_HOST}${source}`,
  }
}

export { transformImage }
