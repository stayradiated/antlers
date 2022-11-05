type ExtractProps = {
  href: string
  title: string
  children: React.ReactNode
}

const Extract = (props: ExtractProps) => {
  const { title, href, children } = props
  return (
    <blockquote>
      <pre>{children}</pre>
      <p>
        From{' '}
        <a href={href} target="_blank" rel="noopener">
          {title}
        </a>
      </p>
    </blockquote>
  )
}

export { Extract }
