const calcWordCount = (input: string): number => {
  // TODO: there must be a faster algorithm for counting words
  const sanitized = input
    .replaceAll(/[^\dA-z\s]/g, '')
    .replaceAll(/\s\s+/g, ' ')
    .trim()
  if (sanitized.length === 0) {
    return 0
  }

  const count = sanitized.split(' ').length
  return count
}

export { calcWordCount }
