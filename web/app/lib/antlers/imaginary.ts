import crypto from 'node:crypto'
import { IMAGINARY_HOST, IMAGINARY_SIGNATURE_KEY } from '../config.server'

const sign = (
  path: string,
  source: string,
  parameters: Record<string, string>,
) => {
  if (source.startsWith('http://') || source.startsWith('https://')) {
    parameters.url = source
  } else {
    parameters.file = source
  }

  const queryString = new URLSearchParams(
    [...Object.entries(parameters)].sort((a, b) => {
      return a[0].localeCompare(b[0])
    }),
  ).toString()

  const signature = crypto
    .createHmac('sha256', IMAGINARY_SIGNATURE_KEY)
    .update(path)
    .update(queryString)
    .digest()
    .toString('base64url')

  const url = `${IMAGINARY_HOST}${path}?${queryString}&sign=${signature}`
  return url
}

export { sign }
