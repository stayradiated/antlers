const createCX = (group: string, component: string) => {
  return (root: string, ...args: Array<string | false | undefined>) => {
    return [`${group}_${component}-${root}`, ...args].filter(Boolean).join(' ')
  }
}

export { createCX }
