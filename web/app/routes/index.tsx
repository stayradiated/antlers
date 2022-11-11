import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import * as dF from 'date-fns'

import { fetchHistory } from '~/lib/history.server'
import type { History } from '~/lib/history.server'

import { HistoryList, PageCSS } from '~/components/history'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: PageCSS,
  },
]

type LoaderData = {
  history: History
}

export const loader: LoaderFunction = async (props) => {
  const url = new URL(props.request.url)
  const ignoreCache = url.searchParams.has('refresh')

  const history = await fetchHistory({ ignoreCache })
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
      <HistoryList history={history} />
    </main>
  )
}
