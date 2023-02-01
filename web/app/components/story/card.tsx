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
  const { title, date, href, wordCount } = props

  return (
    <div className={cx('container')}>
      <h1 className={cx('title')}>
        <Link className={cx('link')} to={href}>
          {title}
        </Link>
      </h1>
      <p>{date}</p>
      <p>{wordCount} words</p>
    </div>
  )
}

export { Card }
