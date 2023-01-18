import type { ResolvedSummary } from './types'
import { createCX } from '~/lib/class-name'

const cx = createCX('sojourn', 'Summary')

type SummaryProps = {
  summary: ResolvedSummary
}

const Summary = (props: SummaryProps) => {
  const { summary } = props

  return (
    <div className={cx('container')}>
      {summary.images.slice(0, 3).map((image, index) => (
        <img key={index} className={cx('image')} src={image.urls.square[32]} />
      ))}
    </div>
  )
}

export { Summary }
