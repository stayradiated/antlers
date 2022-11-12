import { createCX } from '~/lib/class-name'

const cx = createCX('page', 'Tip')

type TipProps = {
  title: string
  children: React.ReactNode
}

const Tip = (props: TipProps) => {
  const { title, children } = props
  return (
    <section className={cx('container')}>
      <h3>{title}</h3>
      {children}
    </section>
  )
}

export { Tip }
