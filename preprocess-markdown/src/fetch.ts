import { createWriteStream } from 'node:fs'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as undici from 'undici'

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
      // File already exists, do not fetch again
      return undefined
    } catch {
      // File does not exist, continue
    }
  }

  console.log(`Saving ${fromUrl} to ${toPath}`)
  await fs.mkdir(path.dirname(toPath), { recursive: true })

  const file = createWriteStream(toPath)
  const response = await undici.request(fromUrl)
  response.body.pipe(file)

  return new Promise((resolve) => {
    response.body.on('end', () => {
      resolve()
    })
  })
}

export { fetchImage }
