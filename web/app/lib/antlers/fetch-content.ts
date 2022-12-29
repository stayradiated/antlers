type FetchContentOptions = {
  pageId: string
  contentHost: string
}

const fetchContent = async (options: FetchContentOptions): Promise<string> => {
  const { contentHost, pageId } = options
  const response = await fetch(`${contentHost}${pageId}`)
  const content = await response.text()
  return content
}

export { fetchContent }
