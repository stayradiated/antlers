import { usePhoto } from '~/hooks/use-photo'
import { createCX } from '~/lib/class-name'

const cx = createCX('page', 'Photo')

type PhotoProps = {
  caption?: string
  src: string
  fullWidth?: boolean
}

const Photo = (props: PhotoProps) => {
  const { caption, src, fullWidth } = props

  const photo = usePhoto(src)

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
