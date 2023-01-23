import { Accomodation } from '~/components/accomodation'
import type { AccomodationTagProps } from '~/lib/antlers/markdoc/tags'

const AccomodationTag = (props: AccomodationTagProps) => {
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
    <Accomodation
      title={title}
      review={review}
      nights={nights}
      costPerNight={costPerNight}
      linkHref={linkHref}
      linkText={linkText}
      description={description}
    >
      {children}
    </Accomodation>
  )
}

export { AccomodationTag }
