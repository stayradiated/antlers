import process from 'node:process'
import * as z from 'zod'

const envSchema = z.object({
  CACHE_DIR_PATH: z.string().default('./tmp'),
  CACHE_HOST: z
    .string()
    .default('http://cat.stayradiated.com/where-is-george-czabania/image/'),
  CONTENT_HOST: z
    .string()
    .default('http://cat.stayradiated.com/where-is-george-czabania/'),
})

const { CACHE_DIR_PATH, CACHE_HOST, CONTENT_HOST } = envSchema.parse(
  process.env,
)

export { CACHE_DIR_PATH, CACHE_HOST, CONTENT_HOST }
