import { usePhoto } from '~/hooks/use-photo'
import { createCX } from '~/lib/class-name'

const cx = createCX('page', 'Image')

type ImageProps = {
  alt?: string
  title?: string
  src: {
    width: number
    height: number
    urls: Record<string, string>
  }
}

const Image = (props: ImageProps) => {
  const { alt, title, src } = props

  const photo = usePhoto(src)

  const fullWidth = true

  return (
    <div
      style={{ flex: photo.aspectRatio }}
      className={cx('main', fullWidth && cx('full-width'))}
    >
      <a
        className="photo-swipe-gallery-item"
        href={photo.src}
        data-pswp-width={photo.width}
        data-pswp-height={photo.height}
        target="_blank"
      >
        <img
          title={title}
          className={cx('img')}
          width={photo.width}
          height={photo.height}
          src={photo.src}
          srcSet={photo.srcSet.join(', ')}
        />
        <img
          className={cx('placeholder')}
          width={photo.width}
          height={photo.height}
          src={src.urls[16]}
          style={{
            imageRendering: 'pixelated',
          }}
        />
      </a>
      {alt && (
        <div style={{ textAlign: 'center', paddingBottom: '1em' }}>{alt}</div>
      )}
    </div>
  )
}

export { Image }
