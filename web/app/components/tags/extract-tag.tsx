import { createCX } from '~/lib/class-name'

const cx = createCX('page', 'Extract')

type ExtractProps = {
  href: string
  title: string
  children: React.ReactNode
}

const Extract = (props: ExtractProps) => {
  const { title, href, children } = props
  return (
    <section className={cx('container')}>
      <em>{children}</em>
      <p>
        From{' '}
        <a href={href} target="_blank" rel="noopener">
          {title}
        </a>
      </p>
    </section>
  )
}

export { Extract }
