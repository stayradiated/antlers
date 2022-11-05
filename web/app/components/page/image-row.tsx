type ImageRowProps = {
  children: React.ReactNode
}

const ImageRow = (props: ImageRowProps) => {
  const { children } = props
  return <div className="page_ImageRow-main">{children}</div>
}

export { ImageRow }
