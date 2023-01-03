import * as crypto from 'node:crypto'

const calcHash = (input: string): string => {
  return crypto
    .createHash('sha256')
    .update(input, 'utf8')
    .digest()
    .toString('base64url')
}

export { calcHash }
