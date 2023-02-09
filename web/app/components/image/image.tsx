import { useRef, useState, useEffect } from 'react'
import { usePhoto } from '~/hooks/use-photo'
import { createCX } from '~/lib/class-name'
import type { ReferencedImage } from '~/lib/antlers'

const cx = createCX('image', 'Image')

type ImageProps = {
  alt?: string
  title?: string
  src: ReferencedImage
}

const Image = (props: ImageProps) => {
  const { alt, title, src } = props

  const photo = usePhoto(src)

  const imageRef = useRef<HTMLImageElement>(null)
  const [isLoading, setLoading] = useState(false)

  const handleLoad = () => {
    setLoading(false)
  }

  useEffect(() => {
    if (!imageRef.current?.complete) {
      setLoading(true)
    }
  }, [])

  return (
    <div
      style={{ flex: photo.aspectRatio }}
      className={cx('main', isLoading && cx('main-isLoading'))}
    >
      <a
        className={cx('link', 'photo-swipe-gallery-item')}
        href={photo.src}
        data-pswp-width={photo.width}
        data-pswp-height={photo.height}
        target="_blank"
        style={{
          backgroundImage: `url(${src.urls.byWidth[16]})`,
        }}
      >
        <img
          ref={imageRef}
          title={title}
          className={cx('img')}
          width={photo.width}
          height={photo.height}
          src={photo.src}
          srcSet={photo.srcSet.join(', ')}
          onLoad={handleLoad}
        />
      </a>
      {alt && <div className={cx('caption')}>{alt}</div>}
    </div>
  )
}

export { Image }
