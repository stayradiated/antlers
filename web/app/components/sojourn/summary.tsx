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
      {summary.images.slice(0, 3).map((image) => (
        <img className={cx('image')} src={image.urls.tinysquare} />
      ))}
    </div>
  )
}

export { Summary }
