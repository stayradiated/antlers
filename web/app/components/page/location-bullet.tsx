import * as dF from 'date-fns'
import { Link } from '@remix-run/react'

import { createCX } from '~/lib/class-name'

import { usePhoto } from '~/hooks/use-photo'

const cx = createCX('page', 'LocationBullet')

type LocationBulletProps = {
  arriveAt: string
  departAt?: string
  location: string
  country: string
  href?: string
  image?: string
  imageAlignV?: number
}

const LocationBullet = (props: LocationBulletProps) => {
  const {
    arriveAt: arriveAtString,
    departAt: departAtString,
    location,
    country,
    href,
    image: imageUrl,
    imageAlignV,
  } = props

  const arriveAt = dF.parseISO(arriveAtString)
  const departAt = departAtString ? dF.parseISO(departAtString) : new Date()
  const arriveAtFormatted = dF.format(arriveAt, 'do MMMM, yyyy')
  const nights = dF.differenceInDays(departAt, arriveAt)

  const image = usePhoto(imageUrl ?? '')

  return (
    <section className={cx('container')}>
      {image && (
        <img
          className={cx('image')}
          src={image.src}
          srcSet={image.srcSet.join(', ')}
          style={{ objectPosition: `50% ${imageAlignV ?? 50}%` }}
        />
      )}

      <div className={cx('details')}>
        <div className={cx('location')}>
           <h1>{location}</h1>
        </div>

        {country && <h2 className={cx('country')}>{country}</h2>}

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
    </section>
  )
}

export { LocationBullet }
