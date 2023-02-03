import * as dF from 'date-fns'
import { Link } from '@remix-run/react'
import { createCX } from '~/lib/class-name'

const cx = createCX('story', 'Card')

type CardProps = {
  title: string
  date: string
  href: string
  wordCount: number
}

const Card = (props: CardProps) => {
  const { title, date: dateString, href, wordCount } = props

  const date = dF.parseISO(dateString)
  const dateFormatted = dF.format(date, 'dd MMM yyyy')

  return (
    <div className={cx('container')}>
      <h1 className={cx('title')}>
        <Link className={cx('link')} to={href}>
          {title}
        </Link>
      </h1>
      <div className={cx('details')}>
        <p className={cx('date')}>{dateFormatted}</p>
        <p className={cx('wordCount')}>{wordCount.toLocaleString()} words</p>
      </div>
    </div>
  )
}

export { Card }
