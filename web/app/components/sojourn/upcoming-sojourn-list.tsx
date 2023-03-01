import { createCX } from '~/lib/class-name'

const cx = createCX('sojourn', 'UpcomingSojournList')

type UpcomingSojournListProps = {
  children: React.ReactNode
}

const UpcomingSojournList = (props: UpcomingSojournListProps) => {
  const { children } = props

  return (
    <div className={cx('container')}>
      <h2 className={cx('title')}>Upcoming</h2>
      {children}
    </div>
  )
}

export { UpcomingSojournList }
