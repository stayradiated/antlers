import { HistoryListItem } from './history-list-item'

import type { History } from '~/lib/history.server'

type HistoryListProps = {
  history: History
}

const HistoryList = (props: HistoryListProps) => {
  const { history } = props

  return (
    <div>
      {history.map((item, index) => (
        <HistoryListItem key={index} item={item} />
      ))}
    </div>
  )
}

export { HistoryList }
