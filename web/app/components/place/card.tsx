import { createCX } from '~/lib/class-name'

const cx = createCX('place', 'Card')

type CardProps = {
  title: string
  category: string
  href: string
  children: React.ReactNode
}

const Card = (props: CardProps) => {
  const { title, category, href, children } = props
  return (
    <section className={cx('container')}>
      <header className={cx('header')}>
        <h3 className={cx('title')}>
          <a className={cx('link')} href={href} target="_blank" rel="noopener">
            {title}
          </a>
        </h3>
        <em className={cx('category')}>{category}</em>
      </header>
      <main>{children}</main>
    </section>
  )
}

export { Card }
