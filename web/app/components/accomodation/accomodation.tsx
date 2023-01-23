import { StarReview, CircularIcon } from '~/components/bit'
import * as icons from '~/icons'

import { createCX } from '~/lib/class-name'

const cx = createCX('accomodation', 'Accomodation')

type DetailsProps = {
  value: string
  description: string
}

const Details = (props: DetailsProps) => {
  const { value, description } = props
  return (
    <p className={cx('details')}>
      <span className={cx('details-value')}>{value}</span>
      <span className={cx('details-description')}>{description}</span>
    </p>
  )
}

type AccomodationProps = {
  title: string
  review: number
  nights: number
  costPerNight: string
  linkHref: string
  linkText: string
  description: string
  children: React.ReactNode
}

const Accomodation = (props: AccomodationProps) => {
  const {
    title,
    review,
    nights,
    costPerNight,
    linkHref,
    linkText,
    description,
    children,
  } = props
  return (
    <section className={cx('container')}>
      <CircularIcon icon={icons.home} className={cx('icon')} alignV={-5} />
      <h3 className={cx('title')}>{title}</h3>
      <div className={cx('row')}>
        <StarReview value={review} className={cx('star')} />
        <Details value={String(nights)} description="nights" />
        <Details value={costPerNight} description="per night" />
      </div>
      <p>{description}</p>
      <a className={cx('link')} href={linkHref} target="_blank" rel="noopener">
        {linkText}
      </a>
      <div className={cx('photos')}>{children}</div>
    </section>
  )
}

export { Accomodation }
