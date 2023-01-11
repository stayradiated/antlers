import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import type { LoaderFunction } from '@remix-run/node'
import invariant from 'tiny-invariant'

import { DEV_SERVER_ENABLED, DEV_SERVER_PATH } from '../../lib/config.server'

const getContentType = (extension: string): string => {
  switch (extension) {
    case '.md': {
      return 'text/plain'
    }

    case '.jpg': {
      return 'image/jpeg'
    }

    case '.svg': {
      return 'image/svg+xml'
    }

    default: {
      return 'application/octet-stream'
    }
  }
}

export const loader: LoaderFunction = async (props) => {
  const { params } = props
  const filepath = params['*']
  invariant(typeof filepath === 'string')

  if (!DEV_SERVER_ENABLED) {
    return new Response('', { status: 404 })
  }

  if (!DEV_SERVER_PATH) {
    throw new Error('DEV_SERVER_PATH is missing')
  }

  const extension = path.extname(filepath)
  const contents = await fs.readFile(path.join(DEV_SERVER_PATH, filepath))
  return new Response(contents, {
    status: 200,
    headers: {
      'Content-Type': getContentType(extension),
    },
  })
}
