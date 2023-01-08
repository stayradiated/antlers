import type { ValidateError } from '@markdoc/markdoc'
import { MarkdocError } from './error'

type MarkdocErrorListProps = {
  errors: ValidateError[]
  source: string
}

const MarkdocErrorList = (props: MarkdocErrorListProps) => {
  const { errors, source } = props

  const sourceLines = source.split('\n')

  return (
    <div className="markdoc_ErrorList-container">
      <h1>Validation Error</h1>
      {errors.map((error, index) => {
        const lines = sourceLines.slice(error.lines[0], error.lines[1])
        return <MarkdocError key={index} error={error} lines={lines} />
      })}
    </div>
  )
}

export { MarkdocErrorList }
