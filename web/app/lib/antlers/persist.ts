declare global {
  /* eslint-disable-next-line no-var */
  var __persist: Record<string, unknown>
}

if (typeof global.__persist !== 'object') {
  global.__persist = {}
}

const getOnce = <T>(key: string, fn: () => T): T => {
  if (key in global.__persist) {
    return global.__persist[key] as T
  }

  const value = fn()
  global.__persist[key] = value
  return value
}

export { getOnce }
