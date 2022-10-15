import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { LoaderFunction } from '@remix-run/node'
import * as dF from 'date-fns'

import { fetchHistory } from '~/lib/history.server'
import type { History } from '~/lib/history.server'

import { HistoryList } from '~/components/history'

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

export default function Index() {
  const { history: serializedHistory } = useLoaderData<LoaderData>()

  const history = serializedHistory.map((item) => {
    return {
      ...item,
      arrivedAt: dF.parseISO(item.arrivedAt),
      departedAt: item.departedAt ? dF.parseISO(item.departedAt) : undefined,
    }
  })

  return (
    <main>
      <p>
        <em>Where is George Czabania?</em>
      </p>
      <HistoryList history={history} />
    </main>
  )
}
