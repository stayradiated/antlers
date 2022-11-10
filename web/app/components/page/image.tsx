import { useImage } from '../../hooks/use-image'

type ImageProps = {
  alt?: string
  title?: string
  src: string
}

const Image = (props: ImageProps) => {
  const { alt, title, src } = props

  const image = useImage(src)

  if (image.type === 'cached') {
    return (
      <div style={{ flex: image.aspectRatio }} className="page_Image-main">
        <a
          className="gallery-item"
          href={image.src}
          data-pswp-width={image.width}
          data-pswp-height={image.height}
          target="_blank"
        >
          <img
            className="page_Image-img"
            width={image.width}
            height={image.height}
            src={image.src}
            srcSet={image.srcSet.join(', ')}
          />
        </a>
        {alt && (
          <div style={{ textAlign: 'center', paddingBottom: '1em' }}>{alt}</div>
        )}
      </div>
    )
  }

  return <img alt={alt} title={title} src={src} />
}

export { Image }
