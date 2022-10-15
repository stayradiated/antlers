import * as dF from 'date-fns'
import type { HistoryItem } from '~/lib/history.server'

type HistoryListItemProps = {
  item: HistoryItem, 
}

const HistoryListItem = (props: HistoryListItemProps) => {
  const { item } = props
  const { arrivedAt, days, location } = item
  const arrivedAtFormatted = dF.format(arrivedAt, 'PPPP')

  return (
    <section>
      <h2>{location}</h2>
      <p>Arrived on <strong>{arrivedAtFormatted}</strong></p>
      <p>For {days} {days === 1 ? 'day' : 'days'}</p>
      <hr />
    </section>
  )
}


export { HistoryListItem }
