import * as undici from 'undici'
import { createWriteStream } from 'fs'
import * as fs from 'fs/promises'
import * as path from 'path'

type FetchImageOptions = {
  fromUrl: string
  toPath: string
  forceFetch?: boolean
}

const fetchImage = async (options: FetchImageOptions): Promise<void> => {
  const { fromUrl, toPath, forceFetch } = options

  if (!forceFetch) {
    try {
      await fs.stat(toPath)
      // file already exists, do not fetch again
      return undefined
    } catch {
      // file does not exist, continue
    }
  }

  console.log(`Saving ${fromUrl} to ${toPath}`)
  await fs.mkdir(path.dirname(toPath))

  const file = createWriteStream(toPath)
  const response = await undici.request(fromUrl)
  response.body.pipe(file)

  return new Promise((resolve) => {
    response.body.on('end', () => resolve())
  })
}

export { fetchImage }
