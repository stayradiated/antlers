import * as dF from 'date-fns'
import { createCX } from '~/lib/class-name'
import * as icons from '~/icons'

const cx = createCX('page', 'Travel')

type Props = {
  type: 'plane' | 'train'
  children: React.ReactNode
  date?: string
  distance: string
}

const travelTypeIcon = {
  plane: icons.airplane,
  train: icons.train,
}

const Travel = (props: Props) => {
  const { date: dateString, type, children, distance } = props

  const date = dateString
    ? dF.format(dF.parseISO(dateString), 'dd MMM yyyy')
    : ''

  return (
    <div className={cx('container')}>
      <img className={cx('icon')} src={travelTypeIcon[type]} />
      <p className={cx('text')}>{children}</p>
      <div className={cx('details')}>
        <p className={cx('date')}>{date}</p>
        <p className={cx('distance')}>{distance}</p>
      </div>
    </div>
  )
}

export { Travel }
