import * as dF from 'date-fns'
import { Link } from '@remix-run/react'
import { BigText } from '~/components/bit/big-text'

import { createCX } from '~/lib/class-name'

import { usePhotoMaybe } from '~/hooks/use-photo'

const cx = createCX('page', 'Location')

type LocationProps = {
  arriveAt: string
  departAt?: string
  location: string
  country: string
  href?: string
  image?: {
    width: number
    height: number
    urls: Record<string, string>
  }
  imageAlignV?: number
  height?: number
}

const Location = (props: LocationProps) => {
  const {
    arriveAt: arriveAtString,
    departAt: departAtString,
    location,
    country,
    href,
    image: imageSource,
    imageAlignV,
    height = 0.5,
  } = props

  const arriveAt = dF.parseISO(arriveAtString)
  const departAt = departAtString ? dF.parseISO(departAtString) : new Date()
  const arriveAtFormatted = dF.format(arriveAt, 'do MMMM, yyyy')
  const nights = dF.differenceInDays(departAt, arriveAt)

  const photo = usePhotoMaybe(imageSource ?? undefined)

  return (
    <section
      className={cx('container')}
      style={{ height: `${height * 100}vh` }}
    >
      {photo && (
        <img
          className={cx('image')}
          src={photo.src}
          srcSet={photo.srcSet.join(', ')}
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
