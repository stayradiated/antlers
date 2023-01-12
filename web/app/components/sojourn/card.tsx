import * as dF from 'date-fns'
import { Link } from '@remix-run/react'

import { Summary } from './summary'
import type { ResolvedSummary } from './types'
import { createCX } from '~/lib/class-name'
import { usePhotoMaybe } from '~/hooks/use-photo'
import type { ReferencedImage } from '~/lib/antlers'

const cx = createCX('sojourn', 'Card')

type SojournProps = {
  arriveAt: string
  departAt?: string
  location: string
  country: string
  href?: string
  image?: ReferencedImage
  summary?: ResolvedSummary
}

const Card = (props: SojournProps) => {
  const {
    arriveAt: arriveAtString,
    departAt: departAtString,
    location,
    country,
    href,
    image: imageSource,
    summary,
  } = props

  const arriveAt = dF.parseISO(arriveAtString)
  const departAt = departAtString ? dF.parseISO(departAtString) : new Date()
  const arriveAtFormatted = dF.format(arriveAt, 'dd MMM yyyy')
  const nights = dF.differenceInDays(departAt, arriveAt)

  const photo = usePhotoMaybe(
    typeof imageSource === 'object' ? imageSource : undefined,
  )

  const element = (
    <section
      className={cx('container', Boolean(photo) && cx('container-has-image'))}
    >
      {photo && (
        <img
          className={cx('image')}
          src={photo.src}
          srcSet={photo.srcSet.join(', ')}
        />
      )}

      <div className={cx('title')}>
        <h1 className={cx('location')}>{location}</h1>
        {country && <h2 className={cx('country')}>{country}</h2>}
      </div>

      <div className={cx('details')}>
        <p className={cx('date')}>
          {arriveAtFormatted} • {nights} {nights === 1 ? 'night' : 'nights'}
        </p>
        {summary && <Summary summary={summary} />}
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

export { Card }
