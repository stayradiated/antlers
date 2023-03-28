import { createContext } from 'react'
import type { References } from '~/lib/antlers'

type PageContextValue = {
  references: References
  basePath: string
}

const PageContext = createContext<PageContextValue>({
  references: {
    files: {},
    images: {},
  },
  basePath: '/',
})

export { PageContext }
export type { PageContextValue }
