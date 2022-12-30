const withDebugTime =
  <Fn extends (...args: any[]) => Promise<any>>(
    fn: Fn,
    getLabel: (...args: Parameters<Fn>) => string,
  ) =>
  async (...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> => {
    const label = getLabel(...args)
    console.time(label)
    const result = await fn(...args)
    console.timeEnd(label)
    return result
  }

export { withDebugTime }
