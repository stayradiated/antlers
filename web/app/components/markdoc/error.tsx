import type { ValidateError, ValidationError } from '@markdoc/markdoc'

type Level = ValidationError['level']
const levelIcon: Record<Level, string> = {
  debug: '🐛',
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
  critical: '☢️',
}

type MarkdocErrorProps = {
  error: ValidateError
  lines: string[]
}

const MarkdocError = (props: MarkdocErrorProps) => {
  const { error, lines } = props

  const icon = levelIcon[error.error.level]

  return (
    <>
      <h2>
        {icon} <code>{error.error.id}</code>
      </h2>
      <pre>
        <code>{lines.join('\n')}</code>
      </pre>
      <p>{error.error.message}</p>
      <hr />
    </>
  )
}

export { MarkdocError }
