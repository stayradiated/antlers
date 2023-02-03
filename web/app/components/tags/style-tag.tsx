import { createCX } from "~/lib/class-name"
import type { StyleTagProps } from '~/lib/antlers/markdoc/tags/index'

const cx = createCX('page', 'Style')

const StyleTag = (props: StyleTagProps) => {
  const { fullWidth, children} = props

  return <div className={cx('container', fullWidth && cx('fullWidth'))}>
    {children}
  </div>
}

export { StyleTag }
