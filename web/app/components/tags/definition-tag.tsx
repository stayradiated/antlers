import { Definition } from '~/components/definition/index'
import type { DefinitionTagProps } from '~/lib/antlers/markdoc/tags'

const DefinitionTag = (props: DefinitionTagProps) => {
  return <Definition {...props} />
}

export { DefinitionTag }
