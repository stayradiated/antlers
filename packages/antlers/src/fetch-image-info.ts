import { errorBoundary } from '@stayradiated/error-boundary'
import * as imaginary from './imaginary.js'
import { $FetchImageInfoResult } from './types.js'
import type { ImaginaryConfig, FetchImageInfoResult } from './types.js'
import { withDebugTime } from './debug.js'

const fetchImageInfo = withDebugTime(
  async (
    source: string,
    imaginaryConfig: ImaginaryConfig,
  ): Promise<FetchImageInfoResult | Error> => {
    const url = imaginary.sign('/info', source, {}, imaginaryConfig)
    console.log(url)

    const content = await errorBoundary(async () => {
      const response = await fetch(url)
      if (response.status >= 400) {
        throw new Error(
          `forceFetchImageInfo: Received ${response.status}: ${response.statusText}`,
        )
      }

      const responseText = await response.text()

      const content = $FetchImageInfoResult.parse(JSON.parse(responseText))
      return content
    })

    return content
  },
  (source) => `fetchImageInfo: ${source}`,
)

export { fetchImageInfo }
