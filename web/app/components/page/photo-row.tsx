import { createCX } from '~/lib/class-name'

type PhotoRowProps = {
  children: React.ReactNode
}

const cx = createCX('page', 'PhotoRow')

const PhotoRow = (props: PhotoRowProps) => {
  const { children } = props
  return <div className={cx('main')}>{children}</div>
}

export { PhotoRow }
