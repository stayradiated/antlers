import * as dF from 'date-fns'
import { Link } from '@remix-run/react'
import { BigText } from './big-text'
import type { HistoryItem } from '~/lib/history.server'

import { createCX } from '~/lib/class-name'

import { usePhoto } from '~/hooks/use-photo'

const cx = createCX('history', 'HistoryListItem')

type HistoryListItemProps = {
  item: HistoryItem
  classNames: {
    root: string
  }
}

const HistoryListItem = (props: HistoryListItemProps) => {
  const { item, classNames } = props

  const {
    arrivedAt,
    days,
    location,
    country,
    href,
    image: imageUrl,
    imageAlignV,
  } = item

  const arrivedAtFormatted = dF.format(arrivedAt, 'PPPP')

  const image = usePhoto(imageUrl ?? '')

  return (
    <section className={`${classNames.root} ${cx('container')}`}>
      {image && (
        <img
          className={cx('image')}
          src={image.src}
          srcSet={image.srcSet.join(', ')}
          style={{ objectPosition: `50% ${imageAlignV ?? 50}%` }}
        />
      )}

      <div className={cx('inner')}>
        <div className={cx('location')}>
          <BigText text={location} />
        </div>

        {country && <h3 className={cx('country')}>{country}</h3>}

        <p className={cx('arrivedAt')}>
          Arrived on <strong>{arrivedAtFormatted}</strong>. For {days}{' '}
          {days === 1 ? 'day' : 'days'}
        </p>

        {href && (
          <Link to={href} className={cx('link')}>
            Read More
          </Link>
        )}
      </div>
    </section>
  )
}

const SmallHistoryListItem = (props: HistoryListItemProps) => {
  return (
    <HistoryListItem
      {...props}
      classNames={{ root: 'history_SmallHistoryListItem-root' }}
    />
  )
}

const LargeHistoryListItem = (props: HistoryListItemProps) => {
  return (
    <HistoryListItem
      {...props}
      classNames={{ root: 'history_LargeHistoryListItem-root' }}
    />
  )
}

export { LargeHistoryListItem, SmallHistoryListItem }
