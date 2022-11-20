import * as dF from 'date-fns'
import { Link } from '@remix-run/react'

import { createCX } from '~/lib/class-name'

import { usePhotoMaybe } from '~/hooks/use-photo'

const cx = createCX('page', 'LocationBullet')

type LocationBulletProps = {
  arriveAt: string
  departAt?: string
  location: string
  country: string
  href?: string
  image?: string
}

const LocationBullet = (props: LocationBulletProps) => {
  const {
    arriveAt: arriveAtString,
    departAt: departAtString,
    location,
    country,
    href,
    image: imageUrl,
  } = props

  const arriveAt = dF.parseISO(arriveAtString)
  const departAt = departAtString ? dF.parseISO(departAtString) : new Date()
  const arriveAtFormatted = dF.format(arriveAt, 'dd MMM yyyy')
  const nights = dF.differenceInDays(departAt, arriveAt)

  const image = usePhotoMaybe(imageUrl)

  const element = (
    <section
      className={cx('container', Boolean(image) && cx('container-has-image'))}
    >
      {image && (
        <img
          className={cx('image')}
          src={image.src}
          srcSet={image.srcSet.join(', ')}
        />
      )}

      <div className={cx('title')}>
        <h1 className={cx('location')}>{location}</h1>
        {country && <h2 className={cx('country')}>{country}</h2>}
      </div>

      <div className={cx('details')}>
        <p className={cx('arriveAt')}>{arriveAtFormatted}</p>
        <p className={cx('nights')}>
          {nights} {nights === 1 ? 'night' : 'nights'}
        </p>
      </div>
    </section>
  )

  if (href) {
    return (
      <Link to={href} className={cx('link')}>
        {element}
      </Link>
    )
  }

  return element
}

export { LocationBullet }
