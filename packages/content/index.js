import * as path from 'node:path'
import antlersConfig from './antlers.json'

// dirname using import.meta
const dirname = path.dirname(new URL(import.meta.url).pathname)
const dbPath = path.resolve(dirname, antlersConfig.dbPath)

export { dbPath }
