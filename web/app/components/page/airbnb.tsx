type AirBnBProps = {
  title: string
  image: string
  review: string
  reviewCount: string
  href: string
}

const AirBnB = (props: AirBnBProps) => {
  const { title, image, review, reviewCount, href } = props
  return (
    <blockquote>
      <img src={image} />
      <h3>{title}</h3>
      <p>
        ★ {review} • {reviewCount} reviews
      </p>
      <a href={href} target="_blank" rel="noopener">
        View on AirBnB
      </a>
    </blockquote>
  )
}

export { AirBnB }
