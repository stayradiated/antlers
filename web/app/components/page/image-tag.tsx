import { useContext } from 'react'
import { Image } from './image'
import { PageContext } from './context'
import { type ImageTagProps } from '~/lib/antlers/markdoc/nodes/index'

const ImageTag = (props: ImageTagProps) => {
  const { src: imageReference, alt, title } = props
  const { references } = useContext(PageContext)
  const src = references.images[imageReference]

  return <Image alt={alt} title={title} src={src} />
}

export { ImageTag }
