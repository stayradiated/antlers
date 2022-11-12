const createCX = (group: string, component: string) => {
  return (root: string, ...args: Array<string | undefined>) => {
    return [`${group}_${component}-${root}`, ...args].filter(Boolean).join(' ')
  }
}

export { createCX }
