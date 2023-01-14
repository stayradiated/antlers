import { sign } from './imaginary'
import { type ReferencedImage } from './types'

type TransformImageOptions = {
  source: string
}

const transformImage = (
  options: TransformImageOptions,
): ReferencedImage['urls'] => {
  const { source } = options

  return {
    svg: source,
    square: {
      32: sign('/resize', source, {
        width: '32',
        height: '32',
        nocrop: 'false',
        type: 'webp',
        quality: '50',
        stripmeta: 'true',
      }),
    },
    byWidth: {
      16: sign('/resize', source, {
        width: '16',
        type: 'webp',
        quality: '50',
        stripmeta: 'true',
      }),
      320: sign('/resize', source, {
        width: '320',
        type: 'webp',
        quality: '50',
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
    },
  }
}

export { transformImage }
