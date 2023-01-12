import { useContext } from 'react'
import { Image } from './image'
import { PageContext } from './context'
import type { ImageTagProps } from '~/lib/antlers/markdoc/nodes/index'
import { getImage } from '~/lib/references'

const ImageTag = (props: ImageTagProps) => {
  const { src: imageKey, alt, title } = props
  const { references } = useContext(PageContext)
  const src = getImage(imageKey, references)

  return <Image alt={alt} title={title} src={src} />
}

export { ImageTag }
