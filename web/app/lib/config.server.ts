import process from 'node:process'
import * as z from 'zod'

const envSchema = z.object({
  DEV_SERVER_ENABLED: z
    .enum(['true', 'false'])
    .optional()
    .transform((arg) => arg === 'true'),
  DEV_SERVER_PATH: z.string().optional(),

  CACHE_DIR_PATH: z.string().default('./tmp'),
  CACHE_HOST: z
    .string()
    .default('http://cat.stayradiated.com/where-is-george-czabania/image/'),
  CONTENT_HOST: z
    .string()
    .default('http://cat.stayradiated.com/where-is-george-czabania/'),
})

const {
  CACHE_DIR_PATH,
  CACHE_HOST,
  CONTENT_HOST,
  DEV_SERVER_ENABLED,
  DEV_SERVER_PATH,
} = envSchema.parse(process.env)

export {
  CACHE_DIR_PATH,
  CACHE_HOST,
  CONTENT_HOST,
  DEV_SERVER_PATH,
  DEV_SERVER_ENABLED,
}
