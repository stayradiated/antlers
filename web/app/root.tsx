import type { MetaFunction, LinksFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import globalStylesheet from './global.css'
import { BASE_PATH } from './lib/config.server'

export const meta: MetaFunction = () => ({
  /* eslint-disable-next-line unicorn/text-encoding-identifier-case */
  charset: 'utf-8',
  title: 'Where is George Czabania?',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: '/favicon.svg',
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/favicon.png',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.googleapis.com',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Mrs+Sheppards&family=Bitter:ital,wght@0,400;0,600;1,400&family=Mukta:wght@200;400;700&display=swap',
  },
  {
    rel: 'stylesheet',
    href: globalStylesheet,
  },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <base href={BASE_PATH} target="_blank" />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
