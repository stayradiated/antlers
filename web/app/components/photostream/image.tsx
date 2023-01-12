import { usePhoto } from '~/hooks/use-photo'
import { createCX } from '~/lib/class-name'
import type { ReferencedImage } from '~/lib/antlers'

const cx = createCX('photostream', 'Image')

type ImageProps = {
  image: ReferencedImage
}

const Image = (props: ImageProps) => {
  const { image } = props

  const photo = usePhoto(image)

  return (
    <a
      className={cx('container', 'photo-swipe-gallery-item')}
      href={photo.src}
      data-pswp-width={photo.width}
      data-pswp-height={photo.height}
      target="_blank"
    >
      {/* <img */}
      {/*   className={cx('image')} */}
      {/*   width={photo.width} */}
      {/*   height={photo.height} */}
      {/*   src={image.urls.square[625]} */}
      {/* /> */}
      <img
        className={cx('placeholder')}
        width={photo.width}
        height={photo.height}
        src={image.urls.byWidth[320]}
        style={{
          imageRendering: 'pixelated',
        }}
      />
    </a>
  )
}

export { Image }
