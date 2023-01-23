import type { VideoTagProps } from '~/lib/antlers/markdoc/tags'

import { Video } from '~/components/video'

const VideoTag = (props: VideoTagProps) => {
  return <Video {...props} />
}

export { VideoTag }
