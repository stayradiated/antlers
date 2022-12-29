import { usePhoto } from '~/hooks/use-photo'
import { createCX } from '~/lib/class-name'

const cx = createCX('page', 'Photo')

type PhotoProps = {
  caption?: string
  src: Record<string, string>
  width: number
  height: number
}

const Photo = (props: PhotoProps) => {
  const { caption, src, width, height } = props

  const photo = usePhoto({ source: src, width, height })

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
          src={src[16]}
          style={{
            imageRendering: 'pixelated',
          }}
        />
      </a>
      {caption && (
        <div style={{ textAlign: 'center', paddingBottom: '1em' }}>
          {caption}
        </div>
      )}
    </div>
  )
}

export { Photo }
