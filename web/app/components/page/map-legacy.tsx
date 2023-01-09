import { createCX } from '~/lib/class-name'

const cx = createCX('page', 'Map')

type MapProps = {
  alt: string
  src: string
}

const MapLegacy = (props: MapProps) => {
  const { alt, src } = props
  return <img className={cx('image')} src={src} alt={alt} />
}

export { MapLegacy }
