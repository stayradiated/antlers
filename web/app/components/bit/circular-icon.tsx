import { createCX } from '~/lib/class-name'

const cx = createCX('bit', 'CircularIcon')

type CircularIconProps = {
  icon: string
  className?: string
  alignV?: number
  alignH?: number
}

const CircularIcon = (props: CircularIconProps) => {
  const { icon, className, alignV, alignH } = props

  return (
    <div className={cx('main', className)}>
      <div
        className={cx('icon')}
        style={{
          backgroundImage: `url(${icon})`,
          marginTop: alignV ? `${alignV}%` : undefined,
          marginLeft: alignH ? `${alignH}%` : undefined,
        }}
      />
    </div>
  )
}

export { CircularIcon }
