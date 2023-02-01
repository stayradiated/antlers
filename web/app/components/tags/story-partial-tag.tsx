import { useContext } from 'react'
import { PageContext } from '~/components/page/context'
import * as Story from '~/components/story'
import type { StoryPartialProps } from '~/lib/antlers/markdoc/tags/index'
import { getFile } from '~/lib/references'

const StoryPartialTag = (props: StoryPartialProps) => {
  const { file: storyFilename } = props
  const pageContext = useContext(PageContext)
  const { references } = pageContext

  const storyFile = getFile('story', storyFilename, references)
  const { title, date } = storyFile.frontmatter
  const { wordCount } = storyFile.summary

  return (
    <Story.Card
      title={title}
      date={date}
      href={storyFilename}
      wordCount={wordCount}
    />
  )
}

export { StoryPartialTag }
