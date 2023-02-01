import { createCX } from '~/lib/class-name'

const cx = createCX('definition', 'Definition')

type DefinitionProps = {
  word: string
  pronunciation: string
  category: string
  children: React.ReactNode
}

const Definition = (props: DefinitionProps) => {
  const { word, pronunciation, category, children } = props

  return (
    <div className={cx('container')}>
      <strong>{word}</strong> ({pronunciation}) <em>{category}</em>
      <div className={cx('content')}>{children}</div>
    </div>
  )
}

export { Definition }
