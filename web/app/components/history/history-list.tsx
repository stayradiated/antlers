import { LargeHistoryListItem, SmallHistoryListItem } from './history-list-item'

import type { History } from '~/lib/history.server'

type HistoryListProps = {
  history: History
}

const HistoryList = (props: HistoryListProps) => {
  const { history } = props

  return (
    <div className="history_HistoryList-container">
      {history.map((item, index) =>
        index === 0 ? (
          <LargeHistoryListItem key={index} item={item} />
        ) : (
          <SmallHistoryListItem key={index} item={item} />
        ),
      )}
    </div>
  )
}

export { HistoryList }
