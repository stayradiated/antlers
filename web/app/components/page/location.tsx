import * as dF from 'date-fns'
import { Link } from '@remix-run/react'
import { BigText } from '~/components/bit/big-text'

import { createCX } from '~/lib/class-name'

import { usePhoto } from '~/hooks/use-photo'

const cx = createCX('page', 'Location')

type LocationProps = {
  arriveAt: string
  departAt?: string
  location: string
  country: string
  href?: string
  image?: string
  imageAlignV?: number
  size: 'large' | 'small'
}

const Location = (props: LocationProps) => {
  const {
    arriveAt: arriveAtString,
    departAt: departAtString,
    location,
    country,
    href,
    image: imageUrl,
    imageAlignV,
    size,
  } = props

  const arriveAt = dF.parseISO(arriveAtString)
  const departAt = departAtString ? dF.parseISO(departAtString) : new Date()
  const arriveAtFormatted = dF.format(arriveAt, 'do MMMM, yyyy')
  const nights = dF.differenceInDays(departAt, arriveAt)

  const image = usePhoto(imageUrl ?? '')

  return (
    <section className={cx('container', cx(`size-${size}`))}>
      {image && (
        <img
          className={cx('image')}
          src={image.src}
          srcSet={image.srcSet.join(', ')}
          style={{ objectPosition: `50% ${imageAlignV ?? 50}%` }}
        />
      )}

      <div className={cx('inner')}>
        <div className={cx('location')}>
          <BigText text={location} />
        </div>

        <div className={cx('details')}>
          {country && <h3 className={cx('country')}>{country}</h3>}

          <p className={cx('arriveAt')}>
            {arriveAtFormatted}{' '}
            <span className={cx('nights')}>
              ∙ {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
          </p>

          {href && (
            <Link to={href} className={cx('link')}>
              Read More
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export { Location }
