import * as icons from '~/icons'

import { createCX } from '~/lib/class-name'

const cx = createCX('bit', 'StarReview')

type StarReviewProps = {
  value: number
  className?: string
}

const StarReview = (props: StarReviewProps) => {
  const { value, className } = props

  return (
    <div className={cx('main', className)}>
      {Array.from({ length: value }).map((_, index) => {
        return (
          <div
            key={index}
            className={cx('star')}
            style={{ backgroundImage: `url(${icons.star})` }}
          />
        )
      })}
      {value % 1 >= 0.5 && (
        <div
          className={cx('star-half')}
          style={{ backgroundImage: `url(${icons.starHalf})` }}
        />
      )}
    </div>
  )
}

export { StarReview }
