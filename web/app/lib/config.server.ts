import process from 'node:process'
import * as z from 'zod'

const envSchema = z.object({
  DEV_SERVER_ENABLED: z
    .enum(['true', 'false'])
    .optional()
    .transform((arg) => arg === 'true'),
  DEV_SERVER_PATH: z.string().optional(),

  CACHE_PATH: z.string(),
  CONTENT_HOST: z.string(),
  IMAGINARY_HOST: z.string(),
  IMAGINARY_SIGNATURE_KEY: z.string(),

  BASE_PATH: z
    .string()
    .regex(/^(\/.+)?\/$/)
    .default('/'),
})

const {
  CONTENT_HOST,
  CACHE_PATH,
  DEV_SERVER_ENABLED,
  DEV_SERVER_PATH,
  IMAGINARY_HOST,
  IMAGINARY_SIGNATURE_KEY,
  BASE_PATH,
} = envSchema.parse(process.env)

export {
  CACHE_PATH,
  CONTENT_HOST,
  DEV_SERVER_PATH,
  DEV_SERVER_ENABLED,
  IMAGINARY_HOST,
  IMAGINARY_SIGNATURE_KEY,
  BASE_PATH,
}
