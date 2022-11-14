import { createCX } from '~/lib/class-name'

type RowProps = {
  children: React.ReactNode
}

const cx = createCX('page', 'Row')

const Row = (props: RowProps) => {
  const { children } = props
  return <div className={cx('main')}>{children}</div>
}

export { Row }
