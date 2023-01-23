type StravaProps = {
  embedUrl: string
}

const Strava = (props: StravaProps) => {
  const { embedUrl } = props

  return <iframe height="405" width="590" src={embedUrl} />
}

export { Strava }
