import { createCX } from '~/lib/class-name'

const cx = createCX('video', 'YouTubeVideo')

const getVideoId = (input: string): string => {
  const url = new URL(input)
  const videoId = url.searchParams.get('v')
  if (!videoId) {
    throw new Error('Could not extract video ID')
  }
  return videoId
}

type YouTubeVideoProps = {
  src: string
}

const YouTubeVideo = (props: YouTubeVideoProps) => {
  const { src } = props

  const videoId = getVideoId(src)

  const nocookieSrc = `https://www.youtube-nocookie.com/embed/${videoId}`

  return (
    <div className={cx('container')}>
      <iframe
        width="672"
        height="378"
        src={nocookieSrc}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  )
}

export { YouTubeVideo }
