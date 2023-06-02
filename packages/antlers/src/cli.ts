import { readFile } from 'node:fs/promises'
import meow from 'meow'
import { errorBoundary } from '@stayradiated/error-boundary'
import z from 'zod'
import { bakeData } from './index.js'

const cli = meow(
  `
	Usage
	  $ antlers

	Options
	  --config, -c  Path to config file

	Examples
	  $ antlers -c ./antlers.json
`,
  {
    importMeta: import.meta,
    flags: {
      config: {
        type: 'string',
        shortFlag: 'c',
        isRequired: true,
      },
    },
  },
)

const $Config = z.object({
  contentDirPath: z.string(),
  dbPath: z.string(),
})
type Config = z.infer<typeof $Config>

const config = await errorBoundary(async (): Promise<Config> => {
  const configJSON = await readFile(cli.flags.config, 'utf8')
  return $Config.parse(JSON.parse(configJSON))
})

if (config instanceof Error) {
  throw config
}

await bakeData({
  ...config,
  imaginaryConfig: z.object({
    host: z.string(),
    signatureKey: z.string(),
  }).parse({
    host: process.env['IMAGINARY_HOST'],
    signatureKey: process.env['IMAGINARY_SIGNATURE_KEY']
  })
})
