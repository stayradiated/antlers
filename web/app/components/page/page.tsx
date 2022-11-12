import { Link } from '@remix-run/react'
import { createCX } from '~/lib/class-name'

const cx = createCX('page', 'Page')

type PageProps = {
  children: React.ReactNode
  className?: string
}

const Page = (props: PageProps) => {
  const { children, className } = props

  return (
    <main className={cx('container', className)}>
      <Link to="/">« Home</Link>

      {children}
    </main>
  )
}

export { Page }
