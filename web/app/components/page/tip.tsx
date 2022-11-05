type TipProps = {
  title: string
  children: React.ReactNode
}

const Tip = (props: TipProps) => {
  const { title, children } = props
  return (
    <blockquote>
      <h3>{title}</h3>
      {children}
    </blockquote>
  )
}

export { Tip }
