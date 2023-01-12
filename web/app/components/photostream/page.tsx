import { Image } from './image'
import type { ReferencedImage } from '~/lib/antlers'
import { createCX } from '~/lib/class-name'
import { Link } from '@remix-run/react'

const cx = createCX('photostream', 'Page')

type PageProps = {
  galleryClassName: string
  images: ReferencedImage[]
}

const Page = (props: PageProps) => {
  const { galleryClassName, images } = props
  return (
    <>
      <Link to="/">« Home</Link>
      <div className={cx('container', galleryClassName)}>
        {images.map((image, index) => (
          <Image key={index} image={image} />
        ))}
      </div>
    </>
  )
}

export { Page }
