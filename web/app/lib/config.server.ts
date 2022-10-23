import * as z from 'zod'
import process from 'process'

const envSchema = z.object({
  CACHE_DIR_PATH: z.string().default('./tmp'),
})

const config = envSchema.parse(process.env)

type Config = z.infer<typeof envSchema>

export { config, type Config }
