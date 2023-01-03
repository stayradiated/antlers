type ErrorMessageProps = {
  message: string
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const { message } = props
  return (
    <pre>
      <code>{message}</code>
    </pre>
  )
}

export { ErrorMessage }
