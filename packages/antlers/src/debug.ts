import process from 'node:process'

const withDebugTime =
  <Fn extends (...args: any[]) => Promise<any>>(
    fn: Fn,
    getLabel: (...args: Parameters<Fn>) => string,
  ) =>
  async (...args: Parameters<Fn>): Promise<Awaited<ReturnType<Fn>>> => {
    const label = getLabel(...args)
    const start = process.hrtime.bigint()
    const result = await fn(...args)
    const end = process.hrtime.bigint()
    const duration = `${
      Math.round(Number((end - start) / BigInt(1000))) / 1000
    } ms`
    console.debug(label, duration)
    return result
  }

export { withDebugTime }
