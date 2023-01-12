/* eslint-disable-next-line @typescript-eslint/ban-types */
type JSONValue = null | boolean | number | string | JSONObject | JSONArray
/* eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style */
type JSONObject = { [k: string]: JSONValue }
type JSONArray = JSONValue[]

type ErrorToObjectOptions = {
  omitting?: string[]
}

const OMISSION = null

type SetOrOmitOptions<Target> = {
  omitting: string[]
  key: string
  source: any
  target: Target
}

const setOrOmit = <Target extends Record<string, unknown>>(
  options: SetOrOmitOptions<Target>,
): Target => {
  const { omitting, target, source, key } = options
  ;(target as any)[key] = omitting.includes(key) ? OMISSION : source[key]
  return target
}

type AnyToObjectOptions = {
  item: unknown
  omitting: string[]
}

const unknownToJSONValue = (options: AnyToObjectOptions): JSONValue => {
  const { item, omitting } = options

  switch (typeof item) {
    case 'undefined':
    case 'function': {
      return null
    }

    case 'symbol': {
      return String(item)
    }

    case 'number':
    case 'string':
    case 'boolean': {
      return item
    }

    case 'bigint': {
      return Number(item)
    }

    case 'object': {
      if (item === null) {
        return null
      }

      if (Array.isArray(item)) {
        return item.map((arrayItem) =>
          unknownToJSONValue({ item: arrayItem, omitting }),
        )
      }

      if (item instanceof Error) {
        const keys = new Set([
          ...Object.keys(item),
          'message',
          'stack',
          'cause',
        ])
        return [...keys].reduce<Record<string, JSONValue>>((acc, key) => {
          if (key === 'cause') {
            acc.cause = omitting.includes('cause')
              ? OMISSION
              : unknownToJSONValue({ item: item.cause, omitting })
            return acc
          }

          return setOrOmit({ omitting, target: acc, source: item, key })
        }, {})
      }

      return Object.keys(item).reduce<Record<string, JSONValue>>(
        (accum, key) => {
          accum[key] = omitting.includes(key)
            ? OMISSION
            : unknownToJSONValue({ item: (item as any)[key], omitting })
          return accum
        },
        {},
      )
    }

    default: {
      return null
    }
  }
}

const errorToObject = (
  error: Error,
  options: ErrorToObjectOptions = {},
): JSONValue => {
  const { omitting = [] } = options
  return unknownToJSONValue({ item: error, omitting })
}

export { errorToObject }
