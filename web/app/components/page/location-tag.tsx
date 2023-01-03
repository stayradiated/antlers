import { useContext } from 'react'
import { Location } from './location'
import { PageContext } from './context'
import type { LocationProps } from '~/lib/antlers/markdoc/tags/index'
import { ErrorMessage } from '~/components/bit'

const LocationTag = (props: LocationProps) => {
  const { image: imageReference } = props

  const pageContext = useContext(PageContext)
  const { references } = pageContext

  const image = imageReference ? references.images[imageReference] : undefined
  if (imageReference && !image) {
    const message = `LocationTag: could not load image reference ${imageReference}`
    return <ErrorMessage message={message} />
  }

  return <Location {...props} image={image} />
}

export { LocationTag }
