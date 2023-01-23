import { useContext } from 'react'
import { Location } from '~/components/location'
import { PageContext } from '~/components/page/context'
import type { LocationProps } from '~/lib/antlers/markdoc/tags/index'
import { getImage } from '~/lib/references'

const LocationTag = (props: LocationProps) => {
  const { image: imageKey } = props

  const pageContext = useContext(PageContext)
  const { references } = pageContext

  const image = imageKey ? getImage(imageKey, references) : undefined

  return <Location {...props} image={image} />
}

export { LocationTag }
