import { test } from 'vitest'

import { fetchImage } from './fetch'

test('fetchImage', async () => {
  await fetchImage({
    fromUrl: 'http://100.125.248.114:2342/api/v1/t/25452e70732f01c9199e564eb7ea53a2f4346961/c540bc70/fit_2560',
    toPath: './image.jpg'
  })
})
