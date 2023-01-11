import { createCX } from '../../lib/class-name'

const cx = createCX('bit', 'ErrorMessage')

type ErrorMessageProps = {
  message: string
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const { message } = props
  return (
    <pre className={cx('container')}>
      <code>{message}</code>
    </pre>
  )
}

export { ErrorMessage }
