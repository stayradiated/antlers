type ImageProps = {
  alt?: string
  title?: string
  src: string
}

const Image = (props: ImageProps) => {
  const { alt, title, src } = props

  if (src.startsWith('cache:')) {
    const [_prefix, id, widthString, heightString] = src.split(':')
    const width = Number.parseInt(widthString, 10)
    const height = Number.parseInt(heightString, 10)

    const getImgUrl = (res: number): string => {
      // Return `https://cat.stayradiated.com/where-is-george-czabania/image/${id}/${res}.jpg`
      return `http://localhost:8080/${id}/${res}.jpg`
    }

    const aspectRatio = width / height

    return (
      <div style={{ flex: aspectRatio }} className="page_Image-main">
        <a
          className="gallery-item"
          href={getImgUrl(2500)}
          data-pswp-width={width}
          data-pswp-height={height}
          target="_blank"
        >
          <img
            className="page_Image-img"
            width={width}
            height={height}
            src={getImgUrl(500)}
            srcSet={[
              `${getImgUrl(500)} 500`,
              `${getImgUrl(750)} 750w`,
              `${getImgUrl(1000)} 1000w`,
              `${getImgUrl(1280)} 1280w`,
              `${getImgUrl(1500)} 1500w`,
              `${getImgUrl(2000)} 2000w`,
              `${getImgUrl(2500)} 2500w`,
            ].join(', ')}
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
