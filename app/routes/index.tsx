import { json} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { LoaderFunction} from '@remix-run/node'
import * as dF from 'date-fns'

import { fetchHistory } from '../lib/history.server'
import type { History, HistoryItem } from '../lib/history.server'

type LoaderData = {
  history: History
}

export const loader: LoaderFunction = async () => {
  const history = await fetchHistory()
  if (history instanceof Error) {
    throw history
  }
  return json<LoaderData>({ history }) 
}

type HistoryItemProps = {
  item: HistoryItem, 
}

const HistoryItem = (props: HistoryItemProps) => {
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

export default function Index() {
  const {history: serializedHistory} = useLoaderData<LoaderData>()

  const history = serializedHistory.map((item) => {
    return {
      ...item,
      arrivedAt: dF.parseISO(item.arrivedAt),
      departedAt: item.departedAt ? dF.parseISO(item.departedAt) : undefined
    }
  })

  return (
    <main>
      <p><em>Where is George?</em></p>
      {history.map((item) => ( <HistoryItem item={item}/> ))}
    </main>
  );
}
