import * as dF from 'date-fns'
import { Link } from '@remix-run/react'
import type { HistoryItem } from '~/lib/history.server'

import { useImage } from '~/hooks/use-image'

const removeDiacritics = (input: string): string => {
  return input.replace(/Ŝ/g, 'S').replace(/ŝ/g, 's')
}

type HistoryListItemProps = {
  item: HistoryItem
  classNames: {
    root: string
  }
}

const HistoryListItem = (props: HistoryListItemProps) => {
  const { item, classNames } = props

  const { arrivedAt, days, location, country, href, image: imageUrl } = item

  const arrivedAtFormatted = dF.format(arrivedAt, 'PPPP')

  const image = useImage(imageUrl)

  return (
    <section
      className={`${classNames.root} history_HistoryListItem-section`}
      style={{
        backgroundImage: image ? `url(${image.src})` : undefined,
      }}
    >
      <div className="history_HistoryListItem-text">
        <h2 className="history_HistoryListItem-location">
          {removeDiacritics(location)}
        </h2>

        {country && (
          <h3 className="history_HistoryListItem-country">{country}</h3>
        )}

        <p className="history_HistoryListItem-arrivedAt">
          Arrived on <strong>{arrivedAtFormatted}</strong>. For {days}{' '}
          {days === 1 ? 'day' : 'days'}
        </p>

        {href && (
          <Link to={href} className="history_HistoryListItem-link">
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
