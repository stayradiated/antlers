import { createCX } from '~/lib/class-name'
import { YouTubeVideo } from "./youtube"

type VideoProps = {
  src: string
  controls?: boolean
  autoPlay?: boolean
  loop?: boolean
}

const cx = createCX('video', 'Video')

const Video = (props: VideoProps) => {
  const { src, controls, autoPlay, loop } = props

  if (src.startsWith('https://www.youtube.com')) {
    return <YouTubeVideo src={src} />
  }

  return (
    <div className={cx('container')}>
      <video
        className={cx('video')}
        src={src}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted
        preload="metadata"
      />
    </div>
  )
}

export { Video }
