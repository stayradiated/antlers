const createCX = (group: string, component: string) => {
  return (className: string) => {
    return `${group}_${component}-${className}`
  }
}

export { createCX }
