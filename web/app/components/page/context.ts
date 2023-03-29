import { createContext } from 'react'
import type { References } from '~/lib/antlers'

type PageContextValue = {
  references: References
}

const PageContext = createContext<PageContextValue>({
  references: {
    files: {},
    images: {},
  },
})

export { PageContext }
export type { PageContextValue }
