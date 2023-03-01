import { UpcomingSojournList } from '../sojourn/index'
import type { UpcomingSojournListTagProps } from '~/lib/antlers/markdoc/tags'

const UpcomingSojournListTag = (props: UpcomingSojournListTagProps) => {
  const { children } = props

  return <UpcomingSojournList>{children}</UpcomingSojournList>
}

export { UpcomingSojournListTag }
