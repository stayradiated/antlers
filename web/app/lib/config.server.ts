import process from 'node:process'
import * as z from 'zod'

const envSchema = z.object({
  DEV_SERVER_ENABLED: z
    .enum(['true', 'false'])
    .optional()
    .transform((arg) => arg === 'true'),
  DEV_SERVER_PATH: z.string().optional(),

  CONTENT_HOST: z.string(),
  IMAGINARY_HOST: z.string(),
  IMAGINARY_SIGNATURE_KEY: z.string(),
})

const {
  CONTENT_HOST,
  DEV_SERVER_ENABLED,
  DEV_SERVER_PATH,
  IMAGINARY_HOST,
  IMAGINARY_SIGNATURE_KEY,
} = envSchema.parse(process.env)

export {
  CONTENT_HOST,
  DEV_SERVER_PATH,
  DEV_SERVER_ENABLED,
  IMAGINARY_HOST,
  IMAGINARY_SIGNATURE_KEY,
}
